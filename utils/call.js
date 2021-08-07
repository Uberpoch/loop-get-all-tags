const axios = require('axios');    
    exports.getTags = async(url, token) => {
    axios.get(url, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'User_Agent': `Nathan UF`
              }
        })
        .then(res => {
            return res.data;
        }) 
        .catch(error => {
            console.log(error);
            })
        
    }