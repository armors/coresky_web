import React from 'react';
import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
function UniswapReact(props) {
	console.log(props)
	return (
		<div>
			<SwapWidget defaultInputTokenAddress={props.defaultInputTokenAddress}
			            defaultOutputTokenAddress={props.defaultOutputTokenAddress}/>
		</div>
	);
}
export default UniswapReact
