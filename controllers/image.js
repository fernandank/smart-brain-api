const axios = require('axios')

const handleApiCall = (req, res) => {
	
	const PAT = '075c027ce7b34fcd80133a2022398523';
	const USER_ID = 'fernandank';
	const APP_ID = 'test_1';
	// Change these to whatever model and image URL you want to use
	const MODEL_ID = 'face-detection';
	const IMAGE_URL = 'imageUrl';

	const raw = ({ 
		  {
		user_app_id: {
		    "user_id": USER_ID,
		    "app_id": APP_ID
		},
		model_id: MODEL_ID,

		inputs: [
		    { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
		]
	    },
		    
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
