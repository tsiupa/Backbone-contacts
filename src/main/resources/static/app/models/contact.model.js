define((require) => {
    'use strict';

    var BaseModel = require('BaseModel');

    return BaseModel.extend({
        urlRoot: '/contact',
        defaults: {
            name: '',
            phone: '',
            group: ''
        },
        validationRules: {
            name: {
                required: true,
                length: {
                    min: 2,
                    max: 20
                }
            },
            phone: {
                required: true,
                regexp: /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/
            },
            group: {
                required: true
            }
        }
    });
});