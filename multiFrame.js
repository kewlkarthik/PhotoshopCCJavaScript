app.preferences.rulerUnits = Units.PIXELS; // Unit prefernces
//multiFrame();

//test();
	if (File(activeDocument.path.fullName+'/'+app.activeDocument.name.slice(0, app.activeDocument.name.length-4)+'_Frames.pdf').exists)
	{
		var f1 = File(activeDocument.path.fullName+'/'+app.activeDocument.name.slice(0, app.activeDocument.name.length-4)+'_Frames.pdf');
		f1.remove();
		//alert(activeDocument.path.fullName+'/'+app.activeDocument.name.slice(0, app.activeDocument.name.length-4)+'_Frames.pdf'+'File deleted');
	}
app.activeDocument.exportDocument(new File(activeDocument.path.fullName+'/'+app.activeDocument.name.slice(0, app.activeDocument.name.length-4)+'.gif'), ExportType.SAVEFORWEB, ExportOptionsSaveForWeb.COMPUSERVEGIF); // Save for Web GIF
playtime();
//alert(stringIDToTypeID("Ply"));
//executeAction(stringIDToTypeID("Ply"), desc, DialogModes.NO);

function playtime() //NUmber of frames
{
	var r = new ActionReference();
	r.putProperty(stringIDToTypeID("property"), stringIDToTypeID("frameCount"));
	r.putClass(stringIDToTypeID("animationClass"));
	var ret = executeActionGet(r);
	var fno = ret.getInteger(stringIDToTypeID("frameCount")); //Total Frame
	for (var i=1; i<=fno; i++) 
	{
			goToFrame(i, fno);//enter frame you want to goto here. now it shows the first frame;
		
	}
}

function goToFrame(frameNum, fno)
{
    var idslct = charIDToTypeID( "slct" );
        var desc2 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref1 = new ActionReference();
            var idanimationFrameClass = stringIDToTypeID( "animationFrameClass" );
            ref1.putIndex( idanimationFrameClass, frameNum );
        desc2.putReference( idnull, ref1 );
    executeAction( idslct, desc2, DialogModes.NO );

    if(app.activeDocument.height.value*1.5 > app.activeDocument.width.value)
    {
    	newDocHorz(frameNum, fno);
    }
    else
    {
    	newDocVerz(frameNum, fno);
    }

    //app.open(File(activeDocument.path.fullName+'/sample.psd'));
}

function newDocHorz(d, fno)
{
	var n = app.activeDocument.name; // Document name
	n = n.slice(0, n.length-4); // To remove document Name extension 
	var savedState = app.activeDocument.activeHistoryState; // Save active history
	var filePath = activeDocument.path.fullName;
	//app.activeDocument.saveAs(new File(activeDocument.path.fullName+'/'+n+'gif'), new GIFSaveOptions(), true, Extension.NONE);
	//app.activeDocument.mergeVisibleLayers();
	app.activeDocument.selection.selectAll();
	app.activeDocument.selection.copy(true);
	app.activeDocument.activeHistoryState = savedState;
	var h = app.activeDocument.height.value+200, w = app.activeDocument.width.value+200;
	var wid = 0;
	if (File(filePath+'/'+n+'_Frames.pdf').exists)
	{
		app.open(File(activeDocument.path.fullName+'/'+n+'_Frames.pdf'));
		wid = w + app.activeDocument.width.value;
		app.activeDocument.resizeCanvas(wid, h, AnchorPosition.TOPLEFT);
    }
    else
    {
    	var ndoc = app.documents.add(w, h, 72, n+'_Frames.pdf', NewDocumentMode.RGB); // Create file
    	wid = w;
    }
	// Create file
	//app.activeDocument.artLayers.add();
	app.activeDocument.paste();
	//alert(w+'/'+wid+'/'+ h);
	var k = app.activeDocument.activeLayer.bounds;
	//alert(k[0]);
	app.activeDocument.activeLayer.translate(k[0], h*.01);
	var myLayers;
	myLayers = activeDocument.artLayers.add(); // Cate New Empty Layer
	myLayers.kind =  LayerKind.TEXT; // Covert the layer into text layer
	myLayers.textItem.contents = "Frame "+d; // Layer content
	myLayers.textItem.position = Array(wid-w*.5+52,h-50);
	//myLayers.textItem.position = Array(app.activeDocument.width*.5-48, app.activeDocument.height-50);
	myLayers.textItem.size = 30;
	//app.activeDocument.activeLayer.translate(k[0], app.activeDocument.height-50);
	if(d==fno)
	{
		app.activeDocument.resizeCanvas(wid+200, h, AnchorPosition.TOPLEFT);
		app.activeDocument.mergeVisibleLayers();
		app.activeDocument.saveAs(new File(filePath+'/'+app.activeDocument.name), PDFSaveOptions); // Save pdf
		app.activeDocument.close(SaveOptions.DONOTSAVECHANGES); // Close pdf
	}
	else
	{
		app.activeDocument.saveAs(new File(filePath+'/'+app.activeDocument.name), PDFSaveOptions); // Save pdf
	}
	
	app.open(File(filePath+'/'+n+'.psd'));	
}



function newDocVerz(d, fno)
{
	var n = app.activeDocument.name; // Document name
	n = n.slice(0, n.length-4); // To remove document Name extension 
	var savedState = app.activeDocument.activeHistoryState; // Save active history
	var filePath = activeDocument.path.fullName;
	//app.activeDocument.saveAs(new File(activeDocument.path.fullName+'/'+n+'gif'), new GIFSaveOptions(), true, Extension.NONE);
	//app.activeDocument.mergeVisibleLayers();
	app.activeDocument.selection.selectAll();
	app.activeDocument.selection.copy(true);
	app.activeDocument.activeHistoryState = savedState;
	var h = app.activeDocument.height.value+200, w = app.activeDocument.width.value+200;
	var hr = 0;
	if (File(filePath+'/'+n+'_Frames.pdf').exists)
	{
		app.open(File(activeDocument.path.fullName+'/'+n+'_Frames.pdf'));
		hr = h + app.activeDocument.height.value;
		app.activeDocument.resizeCanvas(w, hr, AnchorPosition.TOPLEFT);
    }
    else
    {
    	var ndoc = app.documents.add(w, h, 72, n+'_Frames.pdf', NewDocumentMode.RGB); // Create file
    	hr = h;
    }
	// Create file
	//app.activeDocument.artLayers.add();
	app.activeDocument.paste();
	//alert(w+'/'+wid+'/'+ h);
	var k = app.activeDocument.activeLayer.bounds;
	//alert(k[0]);
	app.activeDocument.activeLayer.translate(w*.01, k[1]);
	var myLayers;
	myLayers = activeDocument.artLayers.add(); // Cate New Empty Layer
	myLayers.kind =  LayerKind.TEXT; // Covert the layer into text layer
	myLayers.textItem.contents = "Frame "+d; // Layer content
	myLayers.textItem.position = Array(w*.5-50,hr+h*.5-80);
	//myLayers.textItem.position = Array(app.activeDocument.width*.5-48, app.activeDocument.height-50);
	myLayers.textItem.size = 30;
	//app.activeDocument.activeLayer.translate(k[0], app.activeDocument.height-50);
	if(d==fno)
	{
		app.activeDocument.resizeCanvas(w, hr+200, AnchorPosition.TOPLEFT);
		app.activeDocument.mergeVisibleLayers();
		app.activeDocument.saveAs(new File(filePath+'/'+app.activeDocument.name), PDFSaveOptions); // Save pdf
		app.activeDocument.close(SaveOptions.DONOTSAVECHANGES); // Close pdf
	}
	else
	{
		app.activeDocument.saveAs(new File(filePath+'/'+app.activeDocument.name), PDFSaveOptions); // Save pdf
	}
	
	app.open(File(filePath+'/'+n+'.psd'));	
}