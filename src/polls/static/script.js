 $(function() {
	 
	var sortObj = {
	          
		      connectWith: "ul",
		      axis: "y",
		      handle: ".grab",
		      helper: 'clone',
		      appendTo: $(".poll"),
		      dropOnEmpty: true,
		      start:function(e,ui){
		    	  var $this = $(this);
		    	  
		    	  $(".dropAble").addClass("dropAbleOver")
		      },
		      stop:function(e,ui){
		    	  $(".dropAbleOver").removeClass("dropAbleOver");
		    	  
		      },
		      over:function(e,ui){
		          if ($(ui.sender).find("li").length == 1) {
		              $(ui.sender).hide().next().hide();
		          }
		    	  var $this = $(this);
		    	  if ($this.hasClass("dropAble")){
		    		  $this.addClass("dropAbleOverAndOut");
		    	  }
		    	  
		    	  
		      },
		      out:function(e,ui){
		    	  $(".dropAbleOverAndOut").removeClass("dropAbleOverAndOut");
		    	  /*
		    	  var $this = $(this);
		    	  console.log($this,ui.sender,ui)
		    	  if ($this.hasClass("dropAbleOver")){
		    		  $this.removeClass("dropAbleOver");
		    	  } else {
		    		  console.log("should remove white strip",ui.sender.find("li").length);
		    		  if(ui.sender.find("li").length == 1){
		    			  
		    			  $this.next().remove(); //using next! so be sure not to put DOM element between ul's
		    			  $this.remove();
			    	  }
		    	  }
		    	  */
		    	  
		    	  
		      },
		      receive:function(e,ui){
		    	  
		    	  var $this = $(this);
		    	  handleDrop();
		    	  
		    	  function handleDrop(){
			    	  if ($this.hasClass("dropAble")){
			    		  addNewList($this,ui.item);
			    	  }
			    	  //if has no li's - kill ul
			    	  if(ui.sender.find("li").length == 0){
			    		  ui.sender.next().remove(); //using next! so be sure not to put DOM element between ul's
			    		  ui.sender.remove();
			    	  }
		    	  }
		    	  
		    	  function addNewList($list,$item){
		    		  //create new list
		    		  $newList = $("<ul>").addClass("dropList");
		    		  //add new list to page and add the dropped item into it
		    		  $list.after($newList.sortable(sortObj).append($item));
		    		  //if dropped into 'dropAble' list - add new 'dropAble' list below
		    		  if ($list.hasClass("dropAble")){
		    			  $newList.after($("<ul>").addClass("dropList dropAble").sortable(sortObj));
		    		  }
		    	  }
		      }
		    }; 
	 
	 
	
	init();
	
	function fillPoll(){
		
		$.each(data,function(i,val){
			
			$("<li>").data('id', i)
			.append('<div class="grab"></div>' + val)
			.appendTo($("#listDefault"));
		});
		
	}
	
	function init(){
		// initialize main list 
		var $theList = $("ul.dropList").sortable(sortObj);
		fillPoll();
		// add drop list below and above
		$theList.before($("<ul>").addClass("dropList dropAble").sortable(sortObj));
		$theList.after($("<ul>").addClass("dropList dropAble").sortable(sortObj));
		
		$(".dropList").disableSelection();
		
		
		
		// bind click to submit button
		$("#btnSubmit").click(function(){
			var arr = new Array();
			
			//build array to send
			$("ul.dropList:has(li)").each(function(i,list){
				var innerArray = new Array();
				$(list).find("li").each(function(i,item){
					innerArray.push($(item).data("id"));
				});
				arr.push(innerArray);
			});
			
			//TODO: send array to server side
			$("#hiddenVote").val(JSON.stringify(arr));
		});
	}
	
	
	
});