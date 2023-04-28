const nodemailer = require('nodemailer');
const fs = require('fs');
const { mails } = require('./AllMail')
// console.log(mails);

const mailSender = async () => {
    
    let DerRemove = mails.filter((item, index) => {
        return mails.indexOf(item) === index;
    });   // Remove Dublicate mails 

    let mailCount = 0;  // How many mails send ./
    const mail_Count = DerRemove.length // total mails

    for (let mail of DerRemove) {
        try {
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
                subject: "Application for a job as Backend Developer",
                // text: "This is mail by me",
                html: body,
                attachments: [
                    {
                        filename: "AMIT_YADAV.pdf",
                        content: fs.createReadStream("./AMIT_YADAV.pdf")
                    }
                ]
            });
            console.log(info);
            mailCount++
            console.log(`mail has been sent / Total mail : ${mailCount}/${mail_Count} `);

        } catch (error) {
            console.log(error); 
        }
    }
    // console.log(mailCount, " mail has been sent");      // count how many mails send .
}
mailSender()
