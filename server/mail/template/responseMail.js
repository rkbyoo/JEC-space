const responseRecordedTemplate = (name) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Response Recorded</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 150px;
				margin: 0 auto 20px;
			}
	
			.message {
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
		</style>
	</head>
	
	<body>
		<div class="container">
			<div class="message">Thank You for Your Response</div>
			<div class="body">
				<p>Dear ${name},</p>
				<p>We’ve successfully recorded your response.</p>
				<p>Our team will review it and get back to you shortly.</p>
				<p>We appreciate your time and interest. Stay tuned!</p>
			</div>
			<div class="support">
				If you have any questions or need further assistance, feel free to contact us at 
				<a href="mailto:assamjecspace@gmail.com">jecspace1@gmail.com</a>.
			</div>
		</div>
	</body>
	
	</html>`;
};

module.exports = responseRecordedTemplate;
