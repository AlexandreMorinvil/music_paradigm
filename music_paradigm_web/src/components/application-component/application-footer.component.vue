<template>
	<footer id="footer" class="area-footer">
		<hr />
		<div class="footer-content">
			<p>{{ $t('application-component.footer.footnote-text') }}</p>
		</div>
	</footer>
</template>

<style scoped>
#footer {
	display: block;
	background-color: rgb(18, 18, 18);
	color: rgb(50, 50, 50);
	position: static;
	padding: 20px 50px;
	text-align: center;
	font-size: 15px;
}

hr {
	border: 1px solid rgb(25, 25, 25);
	margin: 0 0 10px;
}

.footer-content {
	display: inline-block;
	max-width: 800px;
	text-align: center;
}
</style>
