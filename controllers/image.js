const Clarifai = require('clarifai');
const axios = require('axios')


//You must add your own API key here from Clarifai. 
// const app = new Clarifai.App({
//  apiKey: '7c1e9f21a94b46e28f1efae16a6d2f19' 
// });


const handleApiCall = (req, res) => {
    const PAT = '075c027ce7b34fcd80133a2022398523'; 
    const IMAGE_URL = req.body.id;
    const raw = {
        "user_app_id": {
            "user_id": 'fernandank',
            "app_id": 'test_1'
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    };


    axios.post("https://api.clarifai.com/v2/models/face-detection/versions/45fb9a671625463fa646c3523a3087d5/outputs", 
                raw,
                { 
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Key ' + PAT
                    }
                }
            )
        .then(response => {
            res.json(response.data)

        })
        .catch(err => res.status(400).json('unable to work with api'))
}


const handleImage = (req,res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
 	res.json(entries[0].entries);
 	})
 	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = { 
	handleImage: handleImage,
	handleApiCall: handleApiCall
}
