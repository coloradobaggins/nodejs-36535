require('dotenv').config();
const twilio = require('twilio');


const sendMsg = async(toWhitelistedNumber, bodySms)=>{
    
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken)

    const fromTwilioAssignedNumber = process.env.TWILIO_FROM_NUMBER;

 
    try {
        const message = await client.messages.create({
            body: bodySms,
            from: fromTwilioAssignedNumber,
            to: toWhitelistedNumber
        })
        console.log(message)
    } catch (error) {
        console.log(error)
    }
        
 
}

module.exports = {sendMsg};


