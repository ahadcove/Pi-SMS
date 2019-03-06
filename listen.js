const MailListener = require('mail-listener2');
const config = require('./config');

var emailDate = new Date().getTime();

var mailListener = new MailListener({
  username: config.auth.username,
  password: config.auth.pass,
  host: config.host,
  port: 993,
  tls: true,
  connTimeout: 10000,
  authTimeout: 5000,
  debug: console.log,
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX",
  searchFilter: ["UNSEEN", ["SINCE", emailDate]],
  markSeen: true,
  fetchUnreadOnStart: false,
  mailParserOptions: {streamAttachments: true},
  attachments: true,
  attachmentOptions: { directory: "attachments/" }
});

mailListener.start();

mailListener.on("mail", function(mail, seqno, attributes){
	console.log('new mail: ', mail);
});

mailListener.on("attachment", function(attachment){
  console.log("*************");
  console.log(attachment.path);
});
