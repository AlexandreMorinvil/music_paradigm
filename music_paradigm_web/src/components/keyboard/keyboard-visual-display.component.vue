<template>
	<!-- The HTML definition of this piano adapted from the open source project : https://codepen.io/zastrow/pen/oDBki -->
	<div id="keyboard-container">
		<ul id="keyboard">
			<li>
				<ul class="keyboard-row">
					<li class="key symbol locked"><span class="off">`</span><span class="on">~</span></li>
					<li class="key symbol" ref="1"><span class="off">1</span><span class="on">!</span></li>
					<li class="key symbol" ref="2"><span class="off">2</span><span class="on">@</span></li>
					<li class="key symbol" ref="3"><span class="off">3</span><span class="on">#</span></li>
					<li class="key symbol" ref="4"><span class="off">4</span><span class="on">$</span></li>
					<li class="key symbol" ref="5"><span class="off">5</span><span class="on">%</span></li>
					<li class="key symbol" ref="6"><span class="off">6</span><span class="on">^</span></li>
					<li class="key symbol" ref="7"><span class="off">7</span><span class="on">&amp;</span></li>
					<li class="key symbol" ref="8"><span class="off">8</span><span class="on">*</span></li>
					<li class="key symbol" ref="9"><span class="off">9</span><span class="on">(</span></li>
					<li class="key symbol" ref="0"><span class="off">0</span><span class="on">)</span></li>
					<li class="key symbol locked" ref="-"><span class="off">-</span><span class="on">_</span></li>
					<li class="key symbol locked" ref="="><span class="off">=</span><span class="on">+</span></li>
					<li class="key delete lastitem locked">delete</li>
				</ul>
			</li>
			<li>
				<ul class="keyboard-row">
					<li class="key tab locked">tab</li>
					<li class="key letter" ref="q">q</li>
					<li class="key letter" ref="w">w</li>
					<li class="key letter" ref="e">e</li>
					<li class="key letter" ref="r">r</li>
					<li class="key letter" ref="t">t</li>
					<li class="key letter" ref="y">y</li>
					<li class="key letter" ref="u">u</li>
					<li class="key letter" ref="i">i</li>
					<li class="key letter" ref="o">o</li>
					<li class="key letter" ref="p">p</li>
					<li class="key symbol locked locked"><span class="off">[</span><span class="on">{</span></li>
					<li class="key symbol locked locked"><span class="off">]</span><span class="on">}</span></li>
					<li class="key symbol lastitem locked"><span class="off">\</span><span class="on">|</span></li>
				</ul>
			</li>
			<li>
				<ul class="keyboard-row">
					<li class="key capslock locked">caps</li>
					<li class="key letter" ref="a">a</li>
					<li class="key letter" ref="s">s</li>
					<li class="key letter" ref="d">d</li>
					<li class="key letter" ref="f">f</li>
					<li class="key letter" ref="g">g</li>
					<li class="key letter" ref="h">h</li>
					<li class="key letter" ref="j">j</li>
					<li class="key letter" ref="k">k</li>
					<li class="key letter" ref="l">l</li>
					<li class="key symbol locked"><span class="off">;</span><span class="on">:</span></li>
					<li class="key symbol locked"><span class="off">'</span><span class="on">&quot;</span></li>
					<li class="key return lastitem locked">return</li>
				</ul>
			</li>
			<li>
				<ul class="keyboard-row">
					<li class="key left-shift locked">shift</li>
					<li class="key letter" ref="z">z</li>
					<li class="key letter" ref="x">x</li>
					<li class="key letter" ref="c">c</li>
					<li class="key letter" ref="v">v</li>
					<li class="key letter" ref="b">b</li>
					<li class="key letter" ref="n">n</li>
					<li class="key letter" ref="m">m</li>
					<li class="key symbol locked"><span class="off">,</span><span class="on">&lt;</span></li>
					<li class="key symbol locked"><span class="off">.</span><span class="on">&gt;</span></li>
					<li class="key symbol locked"><span class="off">/</span><span class="on">?</span></li>
					<li class="key right-shift lastitem locked">shift</li>
				</ul>
			</li>
			<li>
				<ul class="keyboard-row">
					<li class="key space lastitem locked">&nbsp;</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			highlightedDesignatedKeys: [],
			keys: [
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'0',
				'a',
				'b',
				'c',
				'd',
				'e',
				'f',
				'g',
				'h',
				'i',
				'j',
				'k',
				'l',
				'm',
				'n',
				'o',
				'p',
				'q',
				'r',
				's',
				't',
				'u',
				'v',
				'w',
				'x',
				'y',
				'z',
			],
		};
	},
	computed: {
		...mapGetters('experiment', ['interactiveKeyboard', 'interactivePianoFirstOctave']),
		...mapGetters('keyboard', ['currentlyPressedKeyboardKeys', 'referenceKeyboardKeys']),
	},
	methods: {
		designateKeys(keys) {
			if (Array.isArray(keys)) this.highlightedDesignatedKeys = keys;
			else if (typeof keys == 'number') this.highlightedDesignatedKeys = [keys];
		},
		clearDesignatedKeys() {
			this.highlightedDesignatedKeys = [];
		},
		hintAllKeys() {
			const designatedKeys = [];
			for (let index = 0; index < this.referenceKeyboardKeys.length; index++) designatedKeys.push(this.referenceKeyboardKeys[index]);
			this.designateKeys(designatedKeys);
		},
		hintFistKey() {
			this.designateKeys(this.referenceKeyboardKeys[0]);
		},
	},
	beforeDestroy() {
		this.clearDesignatedKeys();
	},
	watch: {
		currentlyPressedKeyboardKeys(list) {
			for (const key of this.keys) {
				const keyString = key.toString();
				if (list.includes(key)) {
					if (!this.referenceKeyboardKeys.includes(key)) this.$refs[keyString].classList.add('wrong');
				} else {
					this.$refs[keyString].classList.remove('wrong');
				}
			}
		},
		highlightedDesignatedKeys(list) {
			for (const key of this.keys) {
				const keyString = key.toString();
				if (list.includes(key)) this.$refs[keyString].classList.add('designated');
				else this.$refs[keyString].classList.remove('designated');
			}
		},
		referenceKeyboardKeys: {
			immediate: true,
			handler: function () {
				this.clearDesignatedKeys();
				if (this.interactiveKeyboard === 'first') this.hintFistKey();
				if (this.interactiveKeyboard === 'all') this.hintAllKeys();
			},
		},
	},
};
</script>

<style scoped>
li {
	list-style: none;
}

#keyboard-container {
	margin: auto;
	width: 850px;
	height: 300px;
	color: black;
	border: 1px solid #160801;
	border-radius: 0.5em;
	background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), rgb(51, 55, 80);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) inset, 0 1px rgba(125, 157, 212, 0.2) inset, 0 5px 15px rgba(0, 0, 0, 0.5);
	padding: 12px;
	border-radius: 10px;
}

#keyboard {
	height: 100%;
	min-height: 100px;
	display: grid;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
}

.keyboard-row {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
}

.key {
	float: left;
	margin: auto 2px;
	width: 5.813%;
	height: 95%;
	line-height: 40px;
	text-align: center;
	background: #fff;

	border-radius: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}

.key {
	color: rgb(209, 210, 212);
	background-color: rgb(50, 50, 50);
	border: 1px solid rgb(20, 20, 20);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.15) inset, 0 1px rgba(17, 17, 17, 0.2) inset, 5px 5px 5px rgba(0, 0, 0, 0.35);
}

.locked {
	background-color: rgb(40, 40, 40);
}

#keyboard > li {
	display: block;
	width: 100%;
	height: 100%;
}

.capslock,
.tab,
.left-shift {
	clear: left;
}
#keyboard .tab,
#keyboard .delete {
	width: 10.174%;
}
#keyboard .capslock {
	width: 11.627%;
}
#keyboard .return {
	width: 11.191%;
}
#keyboard .left-shift {
	width: 95px;
}
#keyboard .right-shift {
	width: 13.808%;
}
.lastitem {
	margin-right: 0;
}
.uppercase {
	text-transform: uppercase;
}
#keyboard .space {
	clear: left;
	width: 100%;
}
.on {
	display: none;
}
.key:hover {
	position: relative;
	top: 1px;
	left: 1px;
	cursor: pointer;
}

ul .designated {
	color: rgb(45, 45, 45);
	border: 1px solid rgb(19, 117, 4);
	background: linear-gradient(to bottom, rgb(255, 252, 81) 0%, rgb(222, 219, 0) 100%);
}

ul .user-triggered {
	border: 1px solid rgb(4, 19, 117);
	background: linear-gradient(to bottom, rgb(0, 187, 255) 0%, rgb(2, 48, 139) 100%);
}

ul .wrong {
	color: rgb(45, 45, 45);
	border: 1px solid rgb(117, 4, 4);
	background: linear-gradient(to bottom, rgb(255, 81, 81) 0%, rgb(222, 0, 0) 100%);
}
</style>
