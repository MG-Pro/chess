function chess() {
	
    // Оформление страницы, красим body
    document.body.style.backgroundColor = 'dimgrey';
	
    // Табло с информацией о выделенной клетке
    var valueId = document.createElement('div');
    valueId.style.width = '100px';
	valueId.style.height = '50px';
	valueId.style.border = '3px solid #791717';
	valueId.style.lineHeight = '50px';
    valueId.style.backgroundColor = 'white';
    valueId.style.fontSize = '50px';
	valueId.style.textAlign = 'center';
	valueId.style.margin = 'auto';
	valueId.style.marginBottom = '20px';
    valueId.id = 'valueId';

    // Ячейки с цифрами
	var vert = document.createElement('div');
	vert.style.width = '30px';
	vert.style.height = '99px';
	vert.style.borderBottom = '1px solid black';
	vert.style.cssFloat = 'left';
	vert.style.lineHeight = '100px';
	
	// Ячейки с буквами
	var hor = document.createElement('div');
	hor.style.width = '99px';
	hor.style.height = '30px';
	hor.style.borderRight = '1px solid black';
	hor.style.cssFloat = 'left';
	hor.style.lineHeight = '30px';
	
	// Вертикальная линия с цифрами
	var vertCol = document.createElement('div');
	vertCol.style.width = '30px';
	vertCol.style.height = '800px';
	vertCol.style.cssFloat = 'left';
	vertCol.style.marginTop = '30px';
	vertCol.style.fontSize = '20px';
	vertCol.style.textAlign = 'center';
	
	// Горизонтальная линия с буквами
	var horCol = document.createElement('div');
	horCol.style.width = '800px';
	horCol.style.height = '30px';
	horCol.style.cssFloat = 'left';
	horCol.style.fontSize = '20px';
	horCol.style.textAlign = 'center';
	
	//Блок для хранения черных фигур
	var blackBlock = document.createElement('div');
	blackBlock.style.width = '200px';
	blackBlock.style.height = '800px';
	blackBlock.style.border = '2px solid black';
	blackBlock.style.cssFloat = 'left';
	blackBlock.style.marginRight = '20px';
	blackBlock.style.color = "#68777f";
	blackBlock.id = 'blackBlock';
	
	//Блок для хранения белых фигур
	var whiteBlock = document.createElement('div');
	whiteBlock.style.width = '200px';
	whiteBlock.style.height = '800px';
	whiteBlock.style.border = '2px solid black';
	whiteBlock.style.cssFloat = 'left';
	whiteBlock.style.marginLeft = '20px';
	whiteBlock.style.color = "#b6b6b6";
	whiteBlock.id = 'whiteBlock';
	
    // Общие параметры клеток
    var cellId;
    var cell = document.createElement('div');
    cell.style.width = '100px';
    cell.style.height = '100px';   
    cell.style.cssFloat = 'left';
    cell.style.fontSize = '100px';
    cell.style.textAlign = 'center';
    cell.style.lineHeight = '110px';
       
    // Делаем функцию создающую клетки в основном поле
    function creatCell(color) {   
        cell.id = cellId;
        cell.style.backgroundColor = color;
        chessBoard.appendChild(cell.cloneNode(true));
        var getId = document.getElementById(cellId);
        getId.onclick = onClValId;
        getId.onmouseenter = onMsOver;
    }
    
	// Делаем функцию создающую фигуры
	function creatFigure(name, position, color) {
		var figure;
		switch(name) {
			case 'pawn': figure = String.fromCharCode(9823);
				break;
			case 'castle': figure = String.fromCharCode(9820);
				break;
			case 'bishop': figure = String.fromCharCode(9821);
				break;
			case 'horse': figure = String.fromCharCode(9822);
				break;
			case 'king': figure = String.fromCharCode(9818);
				break;
			case 'queen': figure = String.fromCharCode(9819);
				break;
		}
		var typeFig = document.getElementById(position);
		typeFig.style.color = color;
		if (color == "#b6b6b6") 
			typeFig.className = 'whiteFigs';
		else if (color == "#68777f")
			typeFig.className = 'blackFigs';
		typeFig.innerHTML = figure;	
	}
	
	//Делаем функцию создающую структуру клеток в блоках для хранения фигур
	function creatCellBlock(color, blockSide, idPref) {   
        var cellIdN = cellId + idPref;
		cell.id = cellIdN;
        cell.style.backgroundColor = color;
        blockSide.appendChild(cell.cloneNode(true));
        var getId = document.getElementById(cellIdN);
        getId.onclick = onClReturn;
        getId.onmouseenter = onMsOver;
    }
	
    // Рисуем клетки в основном поле и присваиваем каждой шахматный id
    for(var n = 8, a = 0, x = 0; a < 8; a++) {
        for (var s = 1; s <= 8; s++, x++) {
            cellId = String.fromCharCode(64 + s) + n;
            x%2 == 0 ? creatCell('white') : creatCell('black');        
        }
        if (s >= 8) {
            n--;
            s = 1;
            x--;
        }
    }
        
    // Рисуем вертикальную и горизонтальную линии для индексов столбцов и строк
	chessBoard.insertBefore(vertCol, chessBoard.firstChild);
	chessBoard.insertBefore(horCol, chessBoard.children[1]);
    
	// Рисуем табло для показа Id клетки
    document.body.insertBefore(valueId, document.body.firstChild);
	
	//Рисуем блоки для хранения фигур
	container.insertBefore(blackBlock, container.firstChild);
	container.insertBefore(whiteBlock, container.children[2]);
	
    // Рисуем клетки с цифрами и буквами
    for(var a = 0; a < 8; a++) {
        vert.innerHTML = 8 - a;
		vertCol.appendChild(vert.cloneNode(true));
		
		hor.innerHTML = String.fromCharCode(65 + a);
		horCol.appendChild(hor.cloneNode(true));
    }
	
	//Рисуем клетки в блоках для хранения фигур и присваеваем каждой уникальный Id
   	for(var a = 0, x = 0, cellId = 1; a < 8; a++) {
	   	for (var s = 1; s <= 2; s++, x++) {
            if(x%2 == 0) {
				creatCellBlock('#a4a49e', blackBlock, '_B');
				creatCellBlock('#F8F8F8', whiteBlock, '_W');
				cellId++;
        	} else {
				creatCellBlock('#4d4d46', blackBlock, '_B');
				creatCellBlock('#919090', whiteBlock, '_W');
				cellId++;
			}
		}
        if (s >= 2) {
            s = 1;
            x--;
        }
    }
	
    // Создаем массив с названиями фигур
    var typeFig = ['castle', 'horse', 'bishop', 'queen', 'king', 'bishop', 'horse', 'castle'];
	
    // Рисуем фигуры
	var pos;
    for(var a = 0; a < 8; a++) {
        
        pos = String.fromCharCode(65 + a) + 7;
        creatFigure('pawn', pos, "#b6b6b6");
        pos = String.fromCharCode(65 + a) + 8;
        creatFigure(typeFig[a], pos, "#b6b6b6");
    
        pos = String.fromCharCode(65 + a) + 2;
        creatFigure('pawn', pos, "#68777f");
        pos = String.fromCharCode(65 + a) + 1;
        creatFigure(typeFig[a], pos, "#68777f");
    }
    
    // Делаем функцию обработчика клика на клетке
    var id; // Сюда будет сохраняться Id предыдущего элемента
    function onClValId() {
        if (id != undefined)
            document.getElementById(id).style.boxShadow = 'none';
        id = this.getAttribute('id');
        document.getElementById('valueId').innerHTML = id;
        this.style.boxShadow = 'inset 0 0 15px 8px #fff400';
		
		// Обработка перемещения фигур в блоки для хранения фигур	
		var cellContent = this.textContent;
		if(cellContent == "") 
			return;
		this.textContent = "";
		var classFig = this.getAttribute('class');
		if (classFig == 'blackFigs') {
			var blackBlockChild = blackBlock.childNodes;
			for(var a = 0, i = 0; a < blackBlockChild.length && i == 0; a++) {
				if(blackBlockChild[a].textContent == "") {
					blackBlockChild[a].textContent = cellContent;
					blackBlockChild[a].dataset.oldId = id; // Записываем первоначальное положение фигуры
					i = 1;
				} else
					i = 0;
			}
		} else {
			var whiteBlockChild = whiteBlock.childNodes;
			for(var a = 0, i = 0; a < whiteBlockChild.length && i == 0; a++) {
				if(whiteBlockChild[a].textContent == "") {
					whiteBlockChild[a].textContent = cellContent;
					whiteBlockChild[a].dataset.oldId = id; // Записываем первоначальное положение фигуры
					i = 1;
				} else
					i = 0;
			}
		}
    }
    
    // Делаем функцию обработчика наведения на клетку
    function onMsOver() {
        this.style.cursor = 'default';
    }
    
	// Задаем обработчик нажатия клавиш
    document.onkeydown = keyMove;
    
    // Делаем функцию обработчика нажатия клавиш
    function keyMove(event) {
        if (id == undefined)
            return;
		document.getElementById(id).style.boxShadow = 'none';
		var keyCode = event.keyCode;
        var row = id.charCodeAt(0);
        var col = id.charAt(1);
		if(keyCode == 37) { //left
			row = String.fromCharCode(row - 1);
			if(row == '@')
				row = 'H';
		} else if(keyCode == 39) { //rigth
			row = String.fromCharCode(row + 1);
			if(row == 'I')
				row = 'A';
		} else if(keyCode == 38) { //up
			col = parseInt(col) + 1;
			if(col == 9)
				col = 1;
			row = String.fromCharCode(row);
		} else if(keyCode == 40) { //down
			col = parseInt(col) - 1;
			if(col == 0)
				col = 8;
			row = String.fromCharCode(row);
		} else 
			return;
		id = row + col;
		document.getElementById('valueId').innerHTML = id;
		document.getElementById(id).style.boxShadow = 'inset 0 0 15px 8px #fff400';
    }

	// Делаем функцию обработчика клика в блоках для хранения фигур
	function onClReturn() {
		var cellContent = this.textContent;
		if(cellContent == "") 
			return;
		this.textContent = "";
		var oldId = this.dataset.oldId;
		document.getElementById(oldId).textContent = cellContent;
	}
}

chess();





















