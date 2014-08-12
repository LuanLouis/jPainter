/**
 * This extension is for appending any directions 
 */

jQuery.fn.extend({
	
	/**
	 * 添加线段
	 */
     appendLine:function(){
        var offset = $(this).offset();
     	var data = arguments[0]||{};
     	data.beginX = data.beginX || 0;
     	data.beginY = data.beginY || 0;
        data.width  = data.width || 1;
        data.color  = data.color || "black";
        data.type  = data.type || "solid";
        var x,y,arc,angle;
        if(!data.degree)
        {
            if(!data.endX)
            {
            	throw new Error("parameter is wrong..");
            }
            if(!data.endY)
            {
               throw new Error("parameter is wrong..");
            }
            
         	var width = data.endX -data.beginX;
         	var height = data.endY-data.beginY;
         	
         	var arctan =  Math.abs(height/width);
         	arc = Math.atan(arctan);
         	data.z = Math.sqrt(Math.pow((height),2)+Math.pow((width),2));
         	angle = (arc/Math.PI)*180;
         	
        	//第一象限
         	if(width>0 && height>0)
         	{
         		y = (data.z *Math.sin(arc))/2;
         		x = -(data.z  - data.z*Math.cos(arc))/2;
         		data.degree = angle;
         	}
         	else if(width<0 && height>0)
         	{
         		x = -(data.z + data.z*Math.cos(arc))/2;
         		y = (data.z *Math.sin(arc))/2;
         		data.degree = 180-angle;
         	}
         	else if(width <0 && height <0)
         	{
         		x = -(data.z + data.z*Math.cos(arc))/2;
         		y = -(data.z *Math.sin(arc))/2;
         		data.degree = 180+angle;
         	}
         	else if(width >0 && height <0)
         	{
         		x = -(data.z - data.z*Math.cos(arc))/2;
         		y = -(data.z *Math.sin(arc))/2;
         		data.degree = -angle;
         	}
         	
        }
        else
        {   
        	if(!data.z)
        	{
        		data.endX =  $(this).width();
        		data.endY = $(this).height();
        		data.z = Math.sqrt(Math.pow((data.endY-data.beginY),2)+Math.pow((data.endX -data.beginX),2));
        	}
        }

        
		data.transform= "rotate("+data.degree+"deg)"; 	
     	var newOne = $("<div></div");
     	newOne.css({
     	"border-top":data.width+" "+ data.type+" "+ data.color,
     	"width":data.z,
     	"transform":data.transform,
     	"position":"absolute",
     	"class":"anyLine",
     	"left":data.beginX+x,
     	"top":data.beginY+y
     	});
     	$(this).append(newOne);
     	return newOne;
     },
     /**
      * 调整线条的位置
      */
     adjustLine:function(){
    	var data = arguments[0]||{}; 
      	data.beginX = data.beginX || 0;
     	data.beginY = data.beginY || 0;
     	data.endX = data.endX || 0;
     	data.endY = data.endY || 0;
     	data.parent = data.parent || $("body");
     	var x,y;
     	var offset = data.parent.offset();
     	var width = data.endX -data.beginX;
     	var height = data.endY-data.beginY;
     	
     	var arctan =  Math.abs(height/width);
     	var arc = Math.atan(arctan);
     	data.z = Math.sqrt(Math.pow((height),2)+Math.pow((width),2));
     	
     	var angle = (arc/Math.PI)*180;
     	//第一象限
     	if(width>0 && height>0)
     	{
     		y = (data.z *Math.sin(arc))/2;
     		x = -(data.z  - data.z*Math.cos(arc))/2;
     		data.degree = angle;
     	}
     	else if(width<0 && height>0)
     	{
     		x = -(data.z + data.z*Math.cos(arc))/2;
     		y = (data.z *Math.sin(arc))/2;
     		data.degree = 180-angle;
     	}
     	else if(width <0 && height <0)
     	{
     		x = -(data.z + data.z*Math.cos(arc))/2;
     		y = -(data.z *Math.sin(arc))/2;
     		data.degree = 180+angle;
     	}
     	else if(width >0 && height <0)
     	{
     		x = -(data.z - data.z*Math.cos(arc))/2;
     		y = -(data.z *Math.sin(arc))/2;
     		data.degree = -angle;
     	}
     	
	    data.transform= "rotate("+data.degree+"deg)"; 	
     	$(this).css({
     		"transform":data.transform,
     		"width":data.z,
     		"left":x+data.beginX,
         	"top": y+data.beginY,
         	"z-index":100
     	});
     }
     
});

