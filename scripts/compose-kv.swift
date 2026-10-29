import AppKit
let root = (CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : FileManager.default.currentDirectoryPath) + "/"
guard let art = NSImage(contentsOfFile:root+"public/assets/kv_luna_launch_hero_v001.jpg"), let logo = NSImage(contentsOfFile:root+"public/assets/samsung-lettermark-black.svg") else { fatalError("Asset unavailable") }
print("Logo", logo.size)
for (name,w,h) in [("composed",1280.0,720.0),("square",1080.0,1080.0),("portrait",1080.0,1350.0)] {
 let canvas = NSImage(size:NSSize(width:w,height:h))
 canvas.lockFocus()
 NSColor(calibratedWhite:0.07,alpha:1).setFill(); NSRect(x:0,y:0,width:w,height:h).fill()
 NSColor.white.setFill(); NSRect(x:0,y:h-85,width:w,height:85).fill()
 logo.draw(in:NSRect(x:48,y:h-64,width:170,height:170*29/130))
 let availH = h > 900 ? h*0.59 : h-130
 let scale = min(w/art.size.width,availH/art.size.height)
 let aw=art.size.width*scale, ah=art.size.height*scale
 art.draw(in:NSRect(x:(w-aw)/2,y:45,width:aw,height:ah))
 if h < 900 { NSColor(calibratedWhite:0.03,alpha:0.80).setFill();NSRect(x:0,y:45,width:495,height:h-130).fill() }
 let titleY = h > 900 ? h-260 : h-300
 ("Luna" as NSString).draw(at:NSPoint(x:64,y:titleY+130),withAttributes:[.font:NSFont.systemFont(ofSize:23),.foregroundColor:NSColor.white])
 ("A new rhythm\nfor home." as NSString).draw(in:NSRect(x:60,y:titleY-2,width:420,height:126),withAttributes:[.font:NSFont.boldSystemFont(ofSize:52),.foregroundColor:NSColor.white])
 NSColor.white.setFill();NSBezierPath(roundedRect:NSRect(x:64,y:titleY-70,width:180,height:48),xRadius:24,yRadius:24).fill()
 ("Discover Luna" as NSString).draw(at:NSPoint(x:93,y:titleY-54),withAttributes:[.font:NSFont.boldSystemFont(ofSize:15),.foregroundColor:NSColor.black])
 ("AI-generated concept visual — RFP proposal, not an official Samsung campaign" as NSString).draw(at:NSPoint(x:48,y:16),withAttributes:[.font:NSFont.systemFont(ofSize:12),.foregroundColor:NSColor.lightGray])
 canvas.unlockFocus()
 guard let tiff=canvas.tiffRepresentation,let rep=NSBitmapImageRep(data:tiff),let png=rep.representation(using:.png,properties:[:]) else {fatalError("Render failed")}
 try png.write(to:URL(fileURLWithPath:root+"public/assets/kv_luna_launch_"+name+"_v001.png"))
 print(name,png.count)
}
