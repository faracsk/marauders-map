class pubNub {
	constructor(username, password, cb) {
		// set details
		this.username = username;
		this.password = password;
		
		// creates pub nub
		this.pubnub = new PubNub({
			publishKey : 'pub-c-260e570c-07b0-4988-805c-1c6e0014407d',
			subscribeKey : 'sub-c-07c504da-b962-11e6-b490-02ee2ddab7fe'
		})

		// add listener to ssecure channel
		this.pubnub.addListener({
		    status: function(statusEvent) {
		    },
		    message: function(message) {
		        console.log("New Message!!", message.message);
		    },
		    presence: function(presenceEvent) {
		        // handle presence
		    }
		})      

		// Subscribing to secure channel
		this.pubnub.subscribe({
		    channels: ['secure'] 
		});

		// getting all other users
		this.pubnub.hereNow(
		    {
		        channels: ["secure"], 
		        includeUUIDs: true,
		        includeState: true
		    },
		    function (status, response) {
		        cb(response.channels.secure.occupants);
		    }
		);
	}

	updateLocation(long, lat) {
		this.pubnub.setState(
		    {
		        state: { "username": this.username, "password": this.password, "long": long, "lat": lat},
		        channels: ['secure']
		    },
		    function (status, response) {
		        console.log("set state")
		    }
		);
	}
}