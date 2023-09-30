var form = document.getElementById("database-form");
form.addEventListener('submit', displayInfo);

var programChart;
var ethnicChart;
var init = false;

function displayInfo(event) {
    event.preventDefault();
    fetch('http://uni-database.herokuapp.com/api/database', {
        method: 'POST',
        body: new FormData(document.getElementById('database-form'))
    })
        .then(response => response.json())
        .then(data => {
            const basicInfo = {
                'name': data['Institution Name'],
                'state': data['State'],
                'city': data['City'],
                'url': data['Homepage Link'],
                'local-pop-size': data['Local Population Size'],
                'cc-basic': data['Carnegie Classification - Basic'],
                'cc-size': data['Carnegie Classification - Size'],
                'religion': data['Religious Affiliation'],
                'region': data['Geographic Region'],
                'undergrad-size': data['Undergrad Size']
            }
            const location = [data['LATITUDE'], data['LONGITUDE']];
            displayBasicInfo(basicInfo);

            if(!init){
                init = true;
            }
            else{
                programChart.destroy();
                ethnicChart.destroy();
            }
            programDistributionChart(data);
            ethnicDistributionChart(data);

            stats(data);
            pricing(data);
        })
        .catch(error => console.error('Error:', error));
}

function displayBasicInfo(data){
    var universityName = document.getElementById('name');
    universityName.innerHTML = data['name'];
    universityName.setAttribute('href', data['url']);
    document.getElementById('location').innerHTML = data['city'] + ', ' + data['state'] + ' (' + data['region'] + ')';
    document.getElementById('local-pop-size').innerHTML = 'Local Population Size: ' + data['local-pop-size'];
    document.getElementById('cc-basic').innerHTML = 'Carnegie Classification (Basic): ' + data['cc-basic'];
    document.getElementById('cc-size').innerHTML = 'Carnegie Classification (Size): ' +  data['cc-size'];
    document.getElementById('religion').innerHTML = 'Religious Affiliation: ' + data['religion'];
    document.getElementById('undergrad-size').innerHTML = 'Undergrad Size: ' + data['undergrad-size'];
}

function programDistributionChart(data){
    init = true;
    const programsData = {
        labels: [
            'Agriculture, Agriculture Operations, and Related Sciences',
            'Natural Resources and Conservation',
            'Architecture and Related Services',
            'Area, Ethnic, Cultural, Gender, and Group Studies',
            'Communication, Journalism, and Related Programs',
            'Communications Technologies/Technicians and Support Services',
            'Computer and Information Sciences and Support Services',
            'Personal and Culinary Services',
            'Education',
            'Engineering',
            'Engineering Technologies and Engineering-Related Fields',
            'Foreign Languages, Literatures, and Linguistics',
            'Family and Consumer Sciences/Human Sciences',
            'Legal Professions and Studies',
            'English Language and Literature/Letters',
            'Liberal Arts and Sciences, General Studies and Humanities',
            'Library Science',
            'Biological and Biomedical Sciences',
            'Mathematics and Statistics',
            'Military Technologies and Applied Sciences',
            'Multi/Interdisciplinary Studies',
            'Parks, Recreation, Leisure, and Fitness Studies',
            'Philosophy and Religious Studies',
            'Theology and Religious Vocations',
            'Physical Sciences',
            'Science Technologies/Technicians',
            'Psychology',
            'Homeland Security, Law Enforcement, Firefighting and Related Protective Services',
            'Public Administration and Social Service Professions',
            'Social Sciences',
            'Construction Trades',
            'Mechanic and Repair Technologies/Technicians',
            'Precision Production',
            'Transportation and Materials Moving',
            'Visual and Performing Arts',
            'Health Professions and Related Programs',
            'Business, Management, Marketing, and Related Support Services',
            'History',
        ],
        datasets: [{
            label: 'Program Distribution',
            data: [
                data['Agriculture, Agriculture Operations, and Related Sciences'],
                data['Natural Resources and Conservation'],
                data['Architecture and Related Services'],
                data['Area, Ethnic, Cultural, Gender, and Group Studies'],
                data['Communication, Journalism, and Related Programs'],
                data['Communications Technologies/Technicians and Support Services'],
                data['Computer and Information Sciences and Support Services'],
                data['Personal and Culinary Services'],
                data['Education'],
                data['Engineering'],
                data['Engineering Technologies and Engineering-Related Fields'],
                data['Foreign Languages, Literatures, and Linguistics'],
                data['Family and Consumer Sciences/Human Sciences'],
                data['Legal Professions and Studies'],
                data['English Language and Literature/Letters'],
                data['Liberal Arts and Sciences, General Studies and Humanities'],
                data['Library Science'],
                data['Biological and Biomedical Sciences'],
                data['Mathematics and Statistics'],
                data['Military Technologies and Applied Sciences'],
                data['Multi/Interdisciplinary Studies'],
                data['Parks, Recreation, Leisure, and Fitness Studies'],
                data['Philosophy and Religious Studies'],
                data['Theology and Religious Vocations'],
                data['Physical Sciences'],
                data['Science Technologies/Technicians'],
                data['Psychology'],
                data['Homeland Security, Law Enforcement, Firefighting and Related Protective Services'],
                data['Public Administration and Social Service Professions'],
                data['Social Sciences'],
                data['Construction Trades'],
                data['Mechanic and Repair Technologies/Technicians'],
                data['Precision Production'],
                data['Transportation and Materials Moving'],
                data['Visual and Performing Arts'],
                data['Health Professions and Related Programs'],
                data['Business, Management, Marketing, and Related Support Services'],
                data['History']
            ],
            backgroundColor: [
                'rgb(59, 102, 31)', 'rgb(16, 184, 66)', 'rgb(95, 73, 223)', 'rgb(168, 188, 180)',
                'rgb(201, 213, 52)', 'rgb(202, 247, 215)', 'rgb(168, 102, 119)', 'rgb(151, 102, 33)',
                'rgb(241, 180, 86)', 'rgb(70, 202, 153)', 'rgb(120, 126, 140)', 'rgb(109, 200, 235)',
                'rgb(75, 173, 122)', 'rgb(15, 163, 175)', 'rgb(48, 192, 169)', 'rgb(145, 108, 140)',
                'rgb(116, 86, 44)', 'rgb(97, 116, 200)', 'rgb(18, 188, 208)', 'rgb(78, 110, 116)',
                'rgb(220, 229, 9)', 'rgb(39, 78, 67)', 'rgb(226, 185, 254)', 'rgb(14, 93, 116)',
                'rgb(188, 136, 10)', 'rgb(219, 90, 178)', 'rgb(93, 137, 214)', 'rgb(177, 202, 145)',
                'rgb(133, 44, 149)', 'rgb(132, 130, 154)', 'rgb(126, 177, 4)', 'rgb(75, 128, 211)',
                'rgb(171, 10, 63)', 'rgb(162, 216, 22)', 'rgb(246, 145, 43)', 'rgb(71, 209, 183)',
                'rgb(62, 193, 145)'
            ],
            hoverOffset: 4
        }]
    };
    const programsOptions = {
        responsive: true,
        title: {
            display: true,
            text: 'Program Distribution',
            fontSize: 20,
            fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
        },
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                fontColor: 'black',
                fontSize: 14,
                fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
            }
        },
    };
    const programsDisplay = {
        type: 'doughnut',
        data: programsData,
        options: programsOptions
    };
    const element = document.getElementById('program-chart').getContext('2d');
    programChart = new Chart(element, programsDisplay);
}

function ethnicDistributionChart(data){
    const programsData = {
        labels: [
            'White',
            'Black',
            'Hispanic',
            'Asian',
            'American Indian / Alaska Native',
            'Native Hawaiian / Pacific Islander',
            '2+ races',
            'Non-resident aliens',
            'Unknown'
        ],
        datasets: [{
            label: 'Ethnic Distribution',
            data: [
                data['Undergrad % White'],
                data['Undergrad % Black'],
                data['Undergrad % Hispanic'],
                data['Undergrad % Asian'],
                data['Undergrad % American Indian / Alaska Native'],
                data['Undergrad % Native Hawaiian / Pacific Islander'],
                data['Undergrad % 2+ races'],
                data['Undergrad % Non-resident aliens'],
                data['Undergrad % Unknown']
            ],
            backgroundColor: [
                'rgb(201, 201, 201)', 'rgb(59, 59, 59)', 'rgb(150, 120, 75)', 'rgb(217, 209, 139)',
                'rgb(102, 80, 45)', 'rgb(97, 161, 92)', 'rgb(84, 129, 176)', 'rgb(136, 84, 176)',
                'rgb(196, 94, 99)'
            ],
            hoverOffset: 4
        }]
    };
    const programsOptions = {
        responsive: true,
        title: {
            display: true,
            text: 'Ethnic Distribution',
            fontSize: 20,
            fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
        },
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                fontColor: 'black',
                fontSize: 14,
                fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
            }
        },
    };
    const programsDisplay = {
        type: 'doughnut',
        data: programsData,
        options: programsOptions
    };
    const element = document.getElementById('ethnic-chart').getContext('2d');
    ethnicChart = new Chart(element, programsDisplay);
}

function stats(data){
    ids = [
        'adm-rate-display',
        'sat-vr-25', 'sat-vr-mid', 'sat-vr-75', 'sat-mt-25', 'sat-mt-mid', 'sat-mt-75',
        'sat-wr-25', 'sat-wr-mid', 'sat-wr-75', 'sat-avg', 'act-cm-25', 'act-cm-mid',
        'act-cm-75', 'act-en-25', 'act-en-mid', 'act-en-75', 'act-mt-25', 'act-mt-mid',
        'act-mt-75', 'act-wr-25', 'act-wr-mid', 'act-wr-75'
    ];
    keys = [
        'Admissions Rate', 'SAT Reading 25%', 'SAT Reading 50%', 'SAT Reading 75%', 'SAT Math 25%',
        'SAT Math 50%', 'SAT Math 75%', 'SAT Writing 25%', 'SAT Writing 50%', 'SAT Writing 75%',
        'SAT Average', 'ACT Cumulative 25%', 'ACT Cumulative 50%', 'ACT Cumulative 75%', 'ACT English 25%',
        'ACT English 50%', 'ACT English 75%', 'ACT Math 25%', 'ACT Math 50%', 'ACT Math 75%', 'ACT Writing 25%',
        'ACT Writing 50%', 'ACT Writing 75%',
    ];
    
    document.getElementById(ids[0]).innerHTML = "Admissions Rate: " + data[keys[0]];
    for(let i = 1; i < ids.length; i++){
        const value = data[keys[i]]
        document.getElementById(ids[i]).innerHTML = value;
    }
}

function pricing(data){
    keys = [
    'Avg Net $',
    'Avg Net $ for $0-$48,000 family income',
    'Avg Net $ for $0-$30,000 family income',
    'Avg Net $ for $30,001-$48,000 family income',
    'Avg Net $ for $30,001-$75,000 family income',
    'Avg Net $ for $48,001-$75,000 family income',
    'Avg Net $ for $75,001-$110,000 family income',
    'Avg Net $ for $75,000+ family income',
    'Avg Net $ for $110,000+ family income',
    'Avg $ of attendance',
    'In-state tuition and fees', 'Out-of-state tuition and fees', 'Undegrad % that got federal loan',
    '$ of attendance: estimated books and supplies', '$ of attendance: on-campus room and board',
    '$ of attendance: on-campus other expenses', '$ of attendance: off-campus room and board',
    '$ of attendance: off-campus other expenses', '$ of attendance: with-family other expenses'
    ];
    keys.forEach((key) => {
        document.getElementById(key).innerHTML = data[key];
    })
}
