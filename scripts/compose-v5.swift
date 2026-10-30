import AppKit
let root=(CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : FileManager.default.currentDirectoryPath)+"/"
let copies=try JSONSerialization.jsonObject(with:Data(contentsOf:URL(fileURLWithPath:root+"src/v5/composition-copy.json"))) as! [String:[String:String]]
let worlds=["living_design","music","kitchen","smart_work"]
let logo=NSImage(contentsOfFile:root+"public/assets/samsung-lettermark-original.png")!
for world in worlds {
 let art=NSImage(contentsOfFile:root+"public/assets/kv_luna_"+world+"_artwork_v001.jpg")!,copy=copies[world]!
 for (suffix,w,h) in [("composed",1280.0,720.0),("square",1080.0,1080.0),("portrait",1080.0,1350.0)] {
  let canvas=NSImage(size:NSSize(width:w,height:h));canvas.lockFocus();NSColor.black.setFill();NSRect(x:0,y:0,width:w,height:h).fill()
  let maxH=h > 900 ? h-470 : h-145,scale=min(w/art.size.width,maxH/art.size.height),aw=art.size.width*scale,ah=art.size.height*scale
  art.draw(in:NSRect(x:(w-aw)/2,y:58,width:aw,height:ah))
  if h < 900 {NSColor(calibratedWhite:0,alpha:0.93).setFill();NSRect(x:0,y:58,width:490,height:h-145).fill()}
  logo.draw(in:NSRect(x:48,y:h-65,width:170,height:170*92/345));let top=h-130
  (copy["hero"]! as NSString).draw(in:NSRect(x:48,y:top-110,width:h>900 ? w-96 : 405,height:110),withAttributes:[.font:NSFont.boldSystemFont(ofSize:39),.foregroundColor:NSColor.white])
  (copy["body"]! as NSString).draw(in:NSRect(x:48,y:top-206,width:h>900 ? 780 : 390,height:90),withAttributes:[.font:NSFont.systemFont(ofSize:19),.foregroundColor:NSColor.white])
  let ctaY=top-268;NSColor.white.setFill();NSBezierPath(roundedRect:NSRect(x:48,y:ctaY,width:285,height:48),xRadius:24,yRadius:24).fill()
  (copy["cta"]! as NSString).draw(at:NSPoint(x:73,y:ctaY+16),withAttributes:[.font:NSFont.boldSystemFont(ofSize:16),.foregroundColor:NSColor.black])
  ("Visual di concept generato con AI — proposta RFP, non campagna ufficiale Samsung" as NSString).draw(in:NSRect(x:40,y:14,width:w-80,height:30),withAttributes:[.font:NSFont.systemFont(ofSize:12),.foregroundColor:NSColor.lightGray]);canvas.unlockFocus()
  let rep=NSBitmapImageRep(data:canvas.tiffRepresentation!)!;try rep.representation(using:.png,properties:[:])!.write(to:URL(fileURLWithPath:root+"public/assets/kv_luna_"+world+"_"+suffix+"_v001.png"))
 }
}
let sheet=NSImage(size:NSSize(width:1600,height:900));sheet.lockFocus()
for(i,world) in worlds.enumerated(){let img=NSImage(contentsOfFile:root+"public/assets/kv_luna_"+world+"_artwork_v001.jpg")!;img.draw(in:NSRect(x:Double(i%2)*800,y:Double(1-i/2)*450,width:800,height:450))}
sheet.unlockFocus();let rep=NSBitmapImageRep(data:sheet.tiffRepresentation!)!;try rep.representation(using:.png,properties:[:])!.write(to:URL(fileURLWithPath:root+"public/assets/kv_luna_worlds_contact_sheet_v001.png"))
print("Four worlds composed, with original logo and product geometry preserved.")
