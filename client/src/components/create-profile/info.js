const info = {
    textField: [
        {
            placeholder: 'Company',
            name: 'company',
            info: 'Could be your own company or one you work for'
        },
        {
            placeholder: 'Website',
            name: 'website',
            info: 'Could be your own website or a company one'
        },
        {
            placeholder: 'Location',
            name: 'location',
            info: 'City or city & state suggested(eg.Boston, MA)'
        },
        {
            placeholder: '* Skills',
            name: 'skills',
            info: 'Please use comma separated values (eg.HTML, CSS, JavaScript, PHP)'
        },
        {
            placeholder: 'Github Username',
            name: 'github',
            info: 'If you want your latest repos and a Github link, include your username'
        }
    ],
    inputField: [
        {
            placeholder: 'Twitter Profile URL',
            name: 'twitter',
            icon: 'fab fa-twitter'
        },
        {
            placeholder: 'Facebook Page URL',
            name: 'facebook',
            icon: 'fab fa-facebook'
        },
        {
            placeholder: 'Linkedin Profile URL',
            name: 'linkedin',
            icon: 'fab fa-linkedin'
        },
        {
            placeholder: 'YouTube Channel URL',
            name: 'youtube',
            icon: 'fab fa-youtube'
        },
        {
            placeholder: 'Instagram Page URL',
            name: 'instagram',
            icon: 'fab fa-instagram'
        },
    ],
    options: [
        { label: '* Select Professional Status', value: 0 },
        { label: 'Developer', value: 'Developer' },
        { label: 'Junior Developer', value: 'Junior Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Student or Learning', value: 'Student or Learning' },
        { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' }
    ]
}

export default info;