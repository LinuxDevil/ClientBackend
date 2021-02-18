import { Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
export class SmsService {

    constructor(@InjectTwilio() private readonly twillo: TwilioClient) {
        this.twillo.verify.services.create({
            friendlyName: 'MyClinic'
        }).then(service => console.log(service.sid));
    }

    async sendSMS(phoneNumber: string, message: string) {
        try {
            return await this.twillo.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber
            })
        } catch (error) {
            return error;
        }
    }

    async sendVerification(phoneNumber: string) {
        this.twillo.verify.services(process.env.SERVICE_SID)
            .verifications.create({
                to: phoneNumber,
                channel: 'sms'
            }).then(verification => {
                console.log(verification);
            })

        // return {
        //     code: "123456"
        // }
    }

    async checkVerification(phoneNumber: string, code: string) {
        console.log(phoneNumber);
        try {
            let value = '';
            await this.twillo.verify.services(process.env.SERVICE_SID)
                .verificationChecks
                .create({
                    to: phoneNumber,
                    code
                }).then(verf => {value = verf.status});
            return value;
        } catch (error) {
            return error;
        }

        // if (code === "123456") {
        //     return {
        //         status: 1,
        //         message: "approved"
        //     }
        // } else {
        //     return new Error("Code is not right");
        // }
    }

}
