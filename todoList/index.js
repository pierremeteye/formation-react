var el = document.getElementById("submit"),
input = document.getElementById("input"),
todoList = document.getElementById('todoList'),
li = document.getElementsByTagName('li'),
textnode 
;


el.addEventListener("click", 
	function(){		

		var liToAdd = document.createElement('li'),
		textnode = document.createTextNode(input.value)
		;

		liToAdd.appendChild(textnode);
		todoList.appendChild(liToAdd);  
		input.value = '';
	}, false
	);


for (var i = 0; i < li.length; i++) {
	li[i].addEventListener("click", 
		function(){		
			console.log('ok')
		}, false
		);
}
