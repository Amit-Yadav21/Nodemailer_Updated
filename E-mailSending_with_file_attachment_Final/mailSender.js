const nodemailer = require('nodemailer');
const fs = require('fs');
const { mails } = require('./AllMail');

const options = { timeZone: 'Asia/Kolkata' };
const Data_time = new Date().toLocaleString('en-US', options);      // ............ show data and time 

const mailSender = async () => {

    if (!fs.existsSync('./Send_mails.json')) {
        fs.writeFile('./Send_mails.json', JSON.stringify([]), (err) => {
            if (err) throw err;
            console.log('File created successfully!');
        });
    } else {

        const unique = mails.filter((item, index) => mails.indexOf(item) === index);    // .......... fillter unique mails

        const mail_Count = unique.length     // .............. total mails  

        let mailCount = 0;      // ........... How many mails send
        const appliedMails = []
        const AppliedMails2 = []

        const MailArr = []      // ........... Read mails and store, MailArr = []
        const UniqueMails = fs.readFileSync('./Send_mails.json', 'utf-8')
        const parseMails = JSON.parse(UniqueMails)
        // console.log(parseMails);

        parseMails.forEach(element => {
            element.HrEmails.forEach((Gmail) => {
                MailArr.push(Gmail)
            })
        });

        for (let mail of unique) {
            try {

                if (!MailArr.includes(mail)) {

                    let transPorter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false,
                        auth: {
                            user: 'amit21@navgurukul.org',
                            pass: 'amit21yadav'
                        }
                    })
                    let body = `<p>Hello Ma'am/sir,</p>
                                <p>                       
                                My name is Amit Yadav, and I am looking for a job as a backend (Node.js) developer. I have completed web development course at Navgurukul, Dharamshala, Himachal Pradesh. I possess good knowledge of Python, JavaScript, databases (MySQL, MongoDB), ExpressJS, and NodeJS.
                                </p>
                                <p>Please find my resume attached below. </p>
                                <p><b>Regard's,</b><br>Amit Yadav<br>Mobile No. : (+91) 9651025253<br>Personal mail :- yadavamit222137@gmail.com</p>`;

                    let info = await transPorter.sendMail({

                        from: '"Amit Yadav" <amit21@navgurukul.org>',
                        to: mail,
                        subject: "Application for a job as Backend Developer( NodeJs )",
                        // text: "This is mail by me",
                        html: body,
                        attachments: [
                            {
                                filename: "AMIT_YADAV.pdf",
                                content: fs.createReadStream("./AMIT_YADAV.pdf")
                            }
                        ]
                    });
                    AppliedMails2.push(mail)
                    console.log(info);
                    mailCount++
                    console.log(`mail has been sent / Total mail : ${mailCount}/${mail_Count} `);

                } else {
                    appliedMails.push(mail)     // ................ applied mails 
                }
            } catch (error) {
                console.log(error);
            }
        }
        console.log('You have allready applied on this mail for the job => ', appliedMails);

        if (AppliedMails2.length != 0) {
            const mailObj = { Data_time: Data_time, Count: AppliedMails2.length, HrEmails: AppliedMails2}
            parseMails.push(mailObj)
            fs.writeFileSync('./Send_mails.json', JSON.stringify(parseMails, null, 4))
            console.log('Applied Mails Stored Successfully....');
        }
    }
}
mailSender()