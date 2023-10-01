import pandas as pd
import numpy as np
from reference import Reference
from thefuzz import fuzz
import json

SETUP = True

class UniversityData:
    def __init__(self):
        self.schools = {}
        self.map_data = {}
        if SETUP:
            with open('data.json') as f:
                self.schools = json.load(f)
                for key, school in self.schools.items():
                    self.map_data[key] = [school['LATITUDE'], school['LONGITUDE']]
                    self.map_data = {k: v for k, v in self.map_data.items() if v != ['n/a', 'n/a']}
            return

        # process file
        ref = Reference()
        df_1 = pd.read_csv('files/file_0.csv', dtype='str')
        df_2 = pd.read_csv('files/file_1.csv', dtype='str')
        df = pd.concat([df_1, df_2])
        df = df.filter(ref.all_dict_headers)
        df.fillna('n/a', inplace=True) # replace NULL with 'n/a'
        unfiltered_data = df.to_dict(orient='list') # dict[list]
        length = len(unfiltered_data['INSTNM'])
        #print(length)

        self.states_count_dict = ref.states_count_dict
        for index in range(length):
            instance = self.return_data_instance(unfiltered_data, index, ref.all_dict_headers)

            if instance['NPT4_PUB'] == 'n/a':
                instance = {k: v for k, v in instance.items() if 'PUB' not in k}
            else:
                instance = {k: v for k, v in instance.items() if 'PRIV' not in k}
            if instance['COSTT4_A'] == 'n/a':
                del instance['COSTT4_A']
            else:
                del instance['COSTT4_P']

            self.map_data[instance['INSTNM']] = [instance['LATITUDE'], instance['LONGITUDE']]
            self.schools[instance['INSTNM']] = self.apply_filters(instance, ref.value_filters, ref.key_filters)
        self.map_data = {k: v for k, v in self.map_data.items() if v != ['n/a', 'n/a']}

        #print(len(self.schools.keys()))
        with open('data.json', 'w') as f:
            json.dump(self.schools, f)

    def return_data(self, name_input):
        return self.schools[name_input]
    
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
    
    def return_data_instance(self, unfiltered_data, index, necessary_headers):
        data = {}
        for header in necessary_headers:
            data[header] = unfiltered_data[header][index]
        url = data['INSTURL']
        if url.startswith('www.'):
            data['INSTURL'] = 'https://' + url
        return data

    def apply_filters(self, data, value_filters, key_filters):
        filter_names = list(value_filters.keys())
        for name in filter_names:
            try:
                data[name] = value_filters[name][data[name]]
            except:
                data[name] = 'n/a'    
        # filter keys
        data = {key_filters[k]: v for k, v in data.items()}
        return data
    
#data = UniversityData()
#print(data.return_data(data.find_name_match('Stanford University')))

def split_df(path):
    df = pd.read_csv(path, dtype='str')
    df_split = np.array_split(df, 2)

    for i, chunk in enumerate(df_split):
        chunk.to_csv(f'file_{i}.csv', index=False)
#split_df('files/MERGED2021_22_PP.csv')