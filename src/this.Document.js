// Document
// HTMLDocument is an extension of Document.  
// If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.

if (!self.Document){ self.Document = self.HTMLDocument }