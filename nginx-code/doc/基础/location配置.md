### 动静分离



#### 普通配置

```
        location /css {
             root   html;
        }
         location /img {
             root   html;
        }
        location /js {
             root   html;
        }

```
#### 正则配置

```
        location ~*/(css|js|img) {
             root   html;
        }

```