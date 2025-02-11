import React from "react";

const DocumentsSection = ({ userId }) => {
  const documents = [
    { type: "Aadhar Card", file: "aadhar.pdf" },
    { type: "Driving License", file: "license.pdf" },
  ];

  return (
    <div className="documents-section">
      <h2>Uploaded Documents</h2>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>
            <strong>{doc.type}:</strong> <a href={doc.file}>Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsSection;