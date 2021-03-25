app.preferences.rulerUnits = Units.PIXELS; // Unit prefernces

	if (File(activeDocument.path.fullName+'/'+app.activeDocument.name.slice(0, app.activeDocument.name.length-4)+'_Frames.pdf').exists)
	{
		var f1 = File(activeDocument.path.fullName+'/'+app.activeDocument.name.slice(0, app.activeDocument.name.length-4)+'_Frames.pdf');
		f1.remove();
	}
app.activeDocument.exportDocument(new File(activeDocument.path.fullName+'/'+app.activeDocument.name.slice(0, app.activeDocument.name.length-4)+'.gif'), ExportType.SAVEFORWEB, ExportOptionsSaveForWeb.COMPUSERVEGIF); // Save for Web GIF

var hr = 0;
var k;
var z = 0;
var check = 0; //Stoke Check

function showDialog() {

    var dlg = new Window("dialog", "Sroke Required?");

    var buttonGroup = dlg.add('group', undefined, '');
    // buttonGroup.alignment = 'right';

    var yesButton = buttonGroup.add('button', undefined, 'Yes', {
        name: 'Yes'
    });

    yesButton.onClick = function () {
    	
        //alert('You click yes button.')
        check = 1;
        dlg.close();
        //playtime();
    };


    var closeButton = buttonGroup.add('button', undefined, 'No', {
        name: 'No'
    });

    closeButton.onClick = function () {
        //alert('You click No');
        check = 0;
        dlg.close();
    };

    dlg.show();

}

//showDialog();


playtime();


function playtime() //NUmber of frames
{
	var r = new ActionReference();
	r.putProperty(stringIDToTypeID("property"), stringIDToTypeID("frameCount"));
	r.putClass(stringIDToTypeID("animationClass"));
	var ret = executeActionGet(r);
	var fno = ret.getInteger(stringIDToTypeID("frameCount")); //Total Frame
	var color = app.backgroundColor; // Change background color
	var oldColor = app.backgroundColor;
	color.rgb.red = 255;
	color.rgb.green = 255;
	color.rgb.blue = 255;
	app.backgroundColor = color;

	for (var i=1; i<=fno; i++) 
	{
			goToFrame(i, fno);//enter frame you want to goto here. now it shows the first frame;
		
	}
	app.backgroundColor = oldColor;
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

}

function newDocHorz(d, fno)
{
	var n = app.activeDocument.name; // Document name
	n = n.slice(0, n.length-4); // To remove document Name extension 
	var savedState = app.activeDocument.activeHistoryState; // Save active history
	var filePath = activeDocument.path.fullName;
	app.activeDocument.selection.selectAll();
	app.activeDocument.selection.copy(true);
	app.activeDocument.activeHistoryState = savedState;
	var h = app.activeDocument.height.value+200, w = app.activeDocument.width.value+100;
	if (File(filePath+'/'+n+'_Frames.pdf').exists)
	{
		app.open(File(activeDocument.path.fullName+'/'+n+'_Frames.pdf'));
    }
    else
    {
    	var ndoc = app.documents.add(w*fno, h, 72, n+'_Frames.pdf', NewDocumentMode.RGB); // Create file
    }
	app.activeDocument.paste();
	var k = app.activeDocument.activeLayer.bounds;
	app.activeDocument.activeLayer.translate(-k[0].value+50+w*(d-1), -k[1].value+100);
	if(check==1){activeStroke();}
	
	var myLayers;
	myLayers = activeDocument.artLayers.add(); // Cate New Empty Layer
	myLayers.kind =  LayerKind.TEXT; // Covert the layer into text layer
	myLayers.textItem.contents = "Frame "+d; // Layer content
	myLayers.textItem.position = Array(w*(d-1)+w*.5-32,h-50);
	myLayers.textItem.size = 20;
	if(d==fno)
	{
		app.activeDocument.resizeCanvas(app.activeDocument.width.value+100, h, AnchorPosition.TOPCENTER);
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
	app.activeDocument.selection.selectAll();
	app.activeDocument.selection.copy(true);
	app.activeDocument.activeHistoryState = savedState;
	var h = app.activeDocument.height.value+100, w = app.activeDocument.width.value+200;
	if (File(filePath+'/'+n+'_Frames.pdf').exists)
	{
		app.open(File(activeDocument.path.fullName+'/'+n+'_Frames.pdf'));
    }
    else
    {
    	var ndoc = app.documents.add(w, h*fno, 72, n+'_Frames.pdf', NewDocumentMode.RGB); // Create file
    }
	app.activeDocument.paste();
	var k = app.activeDocument.activeLayer.bounds; //layer bounds 
	app.activeDocument.activeLayer.translate(-k[0].value+100, -k[1].value+50+h*(d-1)); //reposition the active layer
	if(check==1){activeStroke();}
	
	
	var myLayers;
	myLayers = activeDocument.artLayers.add(); // Cate New Empty Layer
	myLayers.kind =  LayerKind.TEXT; // Covert the layer into text layer
	myLayers.textItem.contents = "Frame "+d; // Layer content
	myLayers.textItem.position = Array(w*.5-32,h*(d-1)+h-20);
	myLayers.textItem.size = 20;
	if(d==fno)
	{
		app.activeDocument.resizeCanvas(w, app.activeDocument.height.value+100, AnchorPosition.MIDDLECENTER);
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


function activeStroke() //Adding stroke to active layer
{
layerTransparencyToSelection();
function layerTransparencyToSelection() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();
	var reference2 = new ActionReference();

	reference.putProperty( s2t( "channel" ), s2t( "selection" ));
	descriptor.putReference( c2t( "null" ), reference );
	reference2.putEnumerated( s2t( "channel" ), s2t( "channel" ), s2t( "transparencyEnum" ));
	descriptor.putReference( s2t( "to" ), reference2 );
	executeAction(s2t( "set" ), descriptor, DialogModes.NO);
}

defaultForeBack();
function defaultForeBack() {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var reference = new ActionReference();

	reference.putProperty( s2t( "color" ), s2t( "colors" ));
	descriptor.putReference( c2t( "null" ), reference );
	executeAction( s2t( "reset" ), descriptor, DialogModes.NO );
}

strokeSelection(1, 100, 0, 0, 0);
function strokeSelection(width, opacity, red, Grn, blue) {
	var c2t = function (s) {
		return app.charIDToTypeID(s);
	};

	var s2t = function (s) {
		return app.stringIDToTypeID(s);
	};

	var descriptor = new ActionDescriptor();
	var descriptor2 = new ActionDescriptor();

	descriptor.putInteger( s2t( "width" ), width );
	descriptor.putEnumerated( s2t( "location" ), c2t( "StrL" ), c2t( "Cntr" ));
	descriptor.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), opacity );
	descriptor.putEnumerated( s2t( "mode" ), s2t( "blendMode" ), s2t( "normal" ));
	descriptor2.putDouble( s2t( "red" ), red );
	descriptor2.putDouble( c2t( "Grn " ), Grn );
	descriptor2.putDouble( s2t( "blue" ), blue );
	descriptor.putObject( s2t( "color" ), s2t( "RGBColor" ), descriptor2 );
	executeAction( s2t( "stroke" ), descriptor, DialogModes.NO );
}

app.activeDocument.selection.deselect();
}