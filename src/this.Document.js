// Document
// HTMLDocument is an extension of Document.  
// If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.

(function(){
  if (!this.Document){
    this.Document = this.HTMLDocument
  }
}())