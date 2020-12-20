<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
export default{
	'name': 'FootnoteSimple',
	'props': {
		'message': {
			'type': String,
			default() {
				return'';
			}
		}
	}
};
</script>

<style scoped></style>
