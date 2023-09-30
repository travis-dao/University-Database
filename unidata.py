import pandas as pd
from reference import Reference
from thefuzz import fuzz

INSTITUTION_NAME = 'INSTNM'

class School:
    def __init__(self, reference_dict, index, necessary_headers):
        # create a local dict[list] with keys as headers
        data = {}
        for header in necessary_headers:
            data[header] = reference_dict[header][index]
        self.data = data
        self.name = data[INSTITUTION_NAME]
        url = self.data['INSTURL']
        if url.startswith('www.'):
            self.data['INSTURL'] = 'https://' + url

    def apply_filters(self, value_filters, key_filters):
        # filter values
        filter_names = list(value_filters.keys())
        for name in filter_names:
            try:
                self.data[name] = value_filters[name][self.data[name]]
            except:
                self.data[name] = 'n/a'    
        # filter keys
        self.data = {key_filters[k]: v for k, v in self.data.items()}
        return self
        
    
    def print_info(self):
        # print data into console
        for k, v in self.data.items():
            print(f'{k}: {v}')
        return self

    def compress_to_string(self):
        # compress print_info in 1 string
        string = ''
        for k, v in self.data.items():
            string += f'{k}: {v}\n'
        return string
    
    def return_location(self):
        # return lat and lon for map data
        return_data = [self.data['LATITUDE'], self.data['LONGITUDE']]
        return return_data

class UniversityData:
    def __init__(self):
        # process file
        self.file = pd.read_csv('files\MERGED2021_22_PP.csv', dtype='str') # read file
        self.file.fillna('n/a', inplace=True) # replace NULL with 'n/a'
        self.reference_dict = self.file.to_dict(orient='list') # dict[list]
        length = len(self.reference_dict[INSTITUTION_NAME])

        ref = Reference()
        self.states_count_dict = ref.states_count_dict

        # dict: {school name: School (class)}
        self.schools = {}
        for index in range(length):
            instance = School(self.reference_dict, index, ref.all_dict_headers)

            if instance.data['NPT4_PUB'] == 'n/a':
                instance.data = {k: v for k, v in instance.data.items() if 'PUB' not in k}
            else:
                instance.data = {k: v for k, v in instance.data.items() if 'PRIV' not in k}
            if instance.data['COSTT4_A'] == 'n/a':
                del instance.data['COSTT4_A']
            else:
                del instance.data['COSTT4_P']

            instance.apply_filters(ref.value_filters, ref.key_filters)
            self.schools[instance.name] = instance
        
        self.map_data = {}
        for name, school in self.schools.items():
            self.map_data[name] = school.return_location()
        self.map_data = {k: v for k, v in self.map_data.items() if v != ['n/a', 'n/a']}

    def return_data_string(self, name_input):
        return self.schools[name_input].compress_to_string()
    
    def return_data(self, name_input):
        return self.schools[name_input].data
    
    def return_map_data(self):
        return self.map_data

    def find_name_match(self, name_input):
        # returns the closest name match
        name_to_return = ''
        stored_similarity_value = 0
        for keys in self.schools.keys():
            similarity_value = fuzz.token_sort_ratio(name_input, keys)
            if (similarity_value > stored_similarity_value):
                stored_similarity_value = similarity_value
                name_to_return = keys
        return name_to_return
    
'''data = UniversityData()
print(data.return_data(data.find_name_match('yale')))'''