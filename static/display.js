const color_secondary = '#C5C6C7'
const font_family = 'Roboto, sans-serif'
const h1 = 16 * 3.5

console.log(data)

// just put the value without formatting, ex. test scores and school name
function display_data_normal(data) {
    const ids = [
        // basic info
        'INSTNM', 'LOCALE', 'CCBASIC', 'CCSIZSET', 'RELAFFIL', 'UGDS',

        // SAT
        'SATVR25', 'SATVRMID', 'SATVR75', 'SATMT25', 'SATMTMID', 'SATMT75', 'SATWR25',
        'SATWRMID', 'SATWR75', 'SAT_AVG',

        // ACT
        'ACTEN25', 'ACTENMID', 'ACTEN75', 'ACTMT25', 'ACTMTMID', 'ACTMT75', 'ACTWR25',
        'ACTWRMID', 'ACTWR75', 'ACTCM25', 'ACTCMMID', 'ACTCM75',

        // Pricing
        'NPT4', 'NPT41', 'NPT42', 'NPT43', 'NPT44', 'NPT45',
        'NPT4_048', 'NPT4_3075', 'NPT4_75UP',

        'COSTT4', 'BOOKSUPPLY', 'ROOMBOARD_ON',
        'OTHEREXPENSE_ON', 'ROOMBOARD_OFF', 'OTHEREXPENSE_OFF', 'OTHEREXPENSE_FAM'
    ]

    ids.forEach(id => {
        let element = document.getElementById(id)
        if (element) {
            element.innerHTML = data[id]
        }
        console.log(data[id])
    })
}

// for values like pricing and %'s
function display_data_special(data) {
    const admRate = Math.round(data['ADM_RATE'] * 100 * 100) / 100
    document.getElementById('ADM_RATE').innerHTML = 'Admissions Rate: ' + (admRate) + '%'
    document.getElementById('PCTFLOAN').innerHTML = (data['PCTFLOAN'] * 100) + '%'
    document.getElementById('TUITIONFEE').innerHTML = `${data['TUITIONFEE_IN']} / ${data['TUITIONFEE_OUT']}`
    document.getElementById('INSTURL').href = `${data['INSTURL']}`
    document.getElementById('LOCATION').innerHTML = `${data['CITY']}, ${data['STABBR']} (${data['REGION']})`
}

function program_distribution_chart(data) {
    const chart_data = {
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
            'History'
        ],
        datasets: [{
            data: [
                data['PCIP01'],
                data['PCIP03'],
                data['PCIP04'],
                data['PCIP05'],
                data['PCIP09'],
                data['PCIP10'],
                data['PCIP11'],
                data['PCIP12'],
                data['PCIP13'],
                data['PCIP14'],
                data['PCIP15'],
                data['PCIP16'],
                data['PCIP19'],
                data['PCIP22'],
                data['PCIP23'],
                data['PCIP24'],
                data['PCIP25'],
                data['PCIP26'],
                data['PCIP27'],
                data['PCIP29'],
                data['PCIP30'],
                data['PCIP31'],
                data['PCIP38'],
                data['PCIP39'],
                data['PCIP40'],
                data['PCIP41'],
                data['PCIP42'],
                data['PCIP43'],
                data['PCIP44'],
                data['PCIP45'],
                data['PCIP46'],
                data['PCIP47'],
                data['PCIP48'],
                data['PCIP49'],
                data['PCIP50'],
                data['PCIP51'],
                data['PCIP52'],
                data['PCIP54'],
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
            borderColor: [
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
            borderWidth: 1
        }]
    }

    const chart_config = {
        plugins: {
            title: {
                display: true,
                text: 'Program Distribution',
                font: {
                    size: h1,
                    family: font_family,
                },
                color: color_secondary
            },
            legend: {
                display: false
            }
        },
        layout: {
            padding: {
                bottom: 48
            }
        },
        responsive: true,
        hoverOffset: 64,
        aspectRatio: 1
    }

    const chart = new Chart('chart-program-distribution', {
        type: 'pie',
        data: chart_data,
        options: chart_config
    })
}

function ethnic_distribution_chart(data) {
    const chart_data = {
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
            data: [
                data['UGDS_WHITE'],
                data['UGDS_BLACK'],
                data['UGDS_HISP'],
                data['UGDS_ASIAN'],
                data['UGDS_AIAN'],
                data['UGDS_NHPI'],
                data['UGDS_2MOR'],
                data['UGDS_NRA'],
                data['UGDS_UNKN'],
            ],
            backgroundColor: [
                'rgb(201, 201, 201)', 'rgb(59, 59, 59)', 'rgb(150, 120, 75)', 'rgb(217, 209, 139)',
                'rgb(102, 80, 45)', 'rgb(97, 161, 92)', 'rgb(84, 129, 176)', 'rgb(136, 84, 176)',
                'rgb(196, 94, 99)'
            ],
            borderColor: [
                'rgb(201, 201, 201)', 'rgb(59, 59, 59)', 'rgb(150, 120, 75)', 'rgb(217, 209, 139)',
                'rgb(102, 80, 45)', 'rgb(97, 161, 92)', 'rgb(84, 129, 176)', 'rgb(136, 84, 176)',
                'rgb(196, 94, 99)'
            ],
            borderWidth: 1
        }]
    }

    const chart_config = {
        plugins: {
            title: {
                display: true,
                text: 'Ethnic Distribution',
                font: {
                    size: h1,
                    family: font_family,
                },
                color: color_secondary
            },
            legend: {
                display: false
            }
        },
        layout: {
            padding: {
                bottom: 48
            }
        },
        responsive: true,
        hoverOffset: 64,
        aspectRatio: 1
    }

    var chart = new Chart('chart-ethnic-distribution', {
        type: 'pie',
        data: chart_data,
        options: chart_config
    })
}

display_data_normal(data)
display_data_special(data)
program_distribution_chart(data)
ethnic_distribution_chart(data)