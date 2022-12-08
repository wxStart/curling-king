### referer
页面请求资源的时候，会带上referer，直接访问时候不带referer  
nginx中可以根据referer去判断是否返回资源，防止其他网站盗链资源



在location中配置 valid_referers none 域名1 域名2;

`
    # 静态资源直接放在 html目录中
		location ~*/(css|js|img) {
			valid_referers none 192.168.44.101;
			# 验证不通过返回403
			if($valid_referers){
				return 403;
			}

             root   html;
        }
`