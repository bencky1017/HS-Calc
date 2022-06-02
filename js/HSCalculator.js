$(function(){
	$('.calc').on('click',function(){
		// 字符串转换为数字
		var curlvl=$('.sub_calc').eq(0).val()-0;/*当前等级*/
		var curnum=$('.sub_calc').eq(1).val()-0;/*当前数量*/
		var destlvl=$('.sub_calc').eq(2).val()-0;/*目标等级*/
		var destnum=$('.sub_calc').eq(3).val()-0;/*目标数量*/

		var ext_lvl=extcalc().l;/*额外等级*/
		var ext_num=extcalc().n;/*额外数量*/
		var extlen=ext_num.length;/*额外长度*/

		// 所有等级小于20，且目标项可为空，当前小于目标
		if (curlvl<20&destlvl<20&curlvl<destlvl|destlvl==''|destnum=='') {
			// 当前不为空，目标有空 合成算法
			if (curlvl!=''&curnum!='') {
				console.clear();
				var temp_lvl=curlvl;
				var temp_num=curnum;
				var temp_dev=compose(curnum).t;
				$('.result tr').remove();
				$('.calculator tr span').html('<span style="color:#44D944;">合成算法</span>');

				while(temp_num>0){
					var result_td='';
					var temp_ext=0;
					for (var j = 0; j < extlen; j++) {
						if (temp_lvl==ext_lvl[j]) {
							temp_ext=ext_num[j]==''?0:ext_num[j];
						}
					}
					result_td='<tr clsass="res_tr"><td>'+temp_lvl+'</td><td>'+temp_num+'</td><td>'+temp_dev+'</td><td>'+temp_ext+'</td></tr>';
					$('.result').append(result_td);
					temp_lvl++;
					temp_num=(compose(parseInt(temp_num)+parseInt(temp_ext)).s);
					temp_dev=(compose(parseInt(temp_num)+parseInt(temp_ext)).t);
				}
			}
			// 当前不为空，目标不为空 分裂算法
			if (destlvl!=''&destnum!='') {
				console.clear();
				var stoplvl=1;
				curlvl==''?stoplvl=1:stoplvl=curlvl;
				var temp_dlvl=destlvl;
				var temp_dnum=destnum;
				$('.result tr').remove();
				$('.calculator tr span').html('<span style="color:#ff0000;">分裂算法</span>');
				while(temp_dlvl>=stoplvl){
					var result_td='<tr clsass="res_tr"><td>'+temp_dlvl+'</td><td>'+temp_dnum+'</td><td>0</td><td>0</td></tr>';
					$('.result').append(result_td);
					temp_dlvl--;
					temp_dnum=(division(temp_dnum).s);
				}
			}
		}else{
			$('.result tr').remove();
			$('.result').append('<tr><th colspan="4" style="color:#ff0000;">ERROR：等级设置出错！</th></tr>');
		}
		extcalc();
	});
	var count=0;/*额外等级个数*/
	$('.add').on('click',function(){
		count++;
		var extra='<tr><td>额外'+(count)+'</td><td><input type="search" class="ext_s_calc" placeholder="可空" onkeyup="value=value.replace(/[^\\d]*/g,\'\')"></td><td><input type="search" class="ext_s_calc" placeholder="可空" onkeyup="value=value.replace(/[^\\d]*/g,\'\')"></td></tr>';
		count<=15?$('table:nth-child(2) tr:nth-child(2)').after(extra):count=15;
	});
	$('.del').on('click',function(){
		count--;
		count=count>0?count:0;
		$('table:nth-child(2)').find('tr').eq(2).remove();
	});
});
var compose=(function compose(number){
	// compose()算法，向上合成算法：五合二，三合一
	var sum=0,tail=1;
	sum=number<5&number>2?1:number<=2?0:number%5==0?number/5*2:number%5==3?(number-3)/5*2+1:parseInt(number/5-1)*2+parseInt((number%5+5)/3);
	tail=number==2?2:number%5==2?1:0;
	console.log('基数：'+number+'\n合成：'+sum+'\n剩余：'+tail);
	return {s:sum,t:tail};
});
var division=(function division(number){
	// division()算法，向下分裂算法：一分三，二分五
	var sum=0;
	sum=number%2==0?number/2*5:(number-1)/2*5+3;
	console.log('基数：'+number+'\n分裂：'+sum);
	return {s:sum,t:0};
});
var extcalc=(function extcalc(){
	// 额外等级数量
	var listlvl=[];
	var listnum=[];

	var curlvl=$('.sub_calc').eq(0).val()-0;/*当前等级*/
	var curnum=$('.sub_calc').eq(1).val()-0;/*当前数量*/
	var destlvl=$('.sub_calc').eq(2).val()-0;/*目标等级*/
	var destnum=$('.sub_calc').eq(3).val()-0;/*目标数量*/

	var n0=$('[class^=ext_s]:even');/*奇数*/
	var n1=$('[class^=ext_s]:odd');/*偶数*/
	
	// 以ext_s开头的输入框
	for (var i = 0; i < n0.length; i++) {
		if (n0[i]>=$('.sub_calc').eq(0).val()-0) {}
		listlvl.push(n0.eq(i).val());
		listnum.push(n1.eq(i).val());
	}
	console.log(listlvl,listnum);
	return {l:listlvl,n:listnum};
});