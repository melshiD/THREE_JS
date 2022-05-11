from: 
https://stackoverflow.com/questions/58968174/how-to-convert-obj-fbx-to-gltf-before-loading-to-scene-using-threejs

There are two ways you could do this:

Method 1:

Convert using from OBJ or FBX to glTF using native libraries on your server, like obj2gltf and fbx2gltf.
Load the glTF file on the web app.
Method 2:

Load the OBJ or FBX using OBJLoader or FBXLoader, giving you a THREE.Mesh or other object.
Convert that THREE.Mesh to a glTF file using GLTFExporter.
Load the glTF file using GLTFLoader, giving you a THREE.Mesh or other object again.
Method 1 is harder, but may give you better conversion results because the native libraries have access to the FBX SDK. Method 2 is fairly easy, but I can’t think of any benefit to doing that… the Mesh you have after the loading the OBJ or FBX will be (at best) the same as the Mesh you get at the end. At worst, the roundtrip through GLTFExporter->GLTFLoader may introduce performance or correctness problems.