<!---
	vim: filetype=html
-->

<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>

<style>
	body{
		background-color: #CCFFFF;
		font-family: Montserrat, sans-serif;
		padding: 0px, 0px, 0px, 30px;
	}

	.slim-orange-border{
		border-color: orange;
		border-width: 3px;
		border-style: solid;
		border-radius: 10%;
	}

	.medium-image{
		width: 150px;
	}

	h2{
		text-align: center;
	}

	.white-background{
		background-color: white;
	}
</style>

<div>
	<h2>Matthews' web page</h2>
	<p></p>
	<p>Things I like:</p>
	<div>
		<ul>
			<li>Violins</li>
		<img class="medium-image slim-orange-border white-background" alt="A violin." src="http://www.elist10.com/wp-content/uploads/2013/10/violin.png">
			<li>Pianos</li>
		<img class="medium-image slim-orange-border white-background" alt="A piano." src="http://pngimg.com/upload/small/piano_PNG10885.png">
		</ul>
	</div>

	<form action="/Tell_me_something">
		<p>How much did you like this page?</p>
		<p>
			<label><input type="checkbox" name="page_rating">0</label>
			<label><input type="checkbox" name="page_rating">1</label>
			<label><input type="checkbox" name="page_rating">2</label>
			<label><input type="checkbox" name="page_rating" checked>3</label>
			<label><input type="checkbox" name="page_rating">4</label>
			<label><input type="checkbox" name="page_rating">5</label>
		</p>
		<input type="text" placeholder="Want to tell me something?">
		<button type="submit">Submit</button>
	</form>
</div>
