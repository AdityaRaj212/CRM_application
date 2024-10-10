import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import GreetingHeader from '../components/GreetingHeader';
import styles from './styles/Documents.module.css';
import Modal from 'react-modal';
import { FaRegFileLines } from "react-icons/fa6";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
import { FaDownload, FaUpload, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Documents = () => {
    const [user, setUser] = useState('');
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [currentDocument, setCurrentDocument] = useState(null);
    const [newFilename, setNewFilename] = useState('');
    const [newFile, setNewFile] = useState(null);
    const [description, setDescription] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('This Month');
    const [selectedFileType, setSelectedFileType] = useState('Documents');
    const [sortOption, setSortOption] = useState('Date');

    useEffect(() => {
        fetchDocuments();
    }, [selectedMonth, selectedFileType, sortOption]);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get('/api/documents', {
                params: { month: selectedMonth, fileType: selectedFileType, sort: sortOption }
            });
            setDocuments(response.data);
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                const userResponse = await axios.get(`/api/users/get-user-by-id/${storedUserId}`);
                setUser(userResponse.data.user);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (doc) => {
        setCurrentDocument(doc);
        setNewFilename(doc.filename);
        setDescription(doc.description);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentDocument(null);
        setNewFilename('');
        setNewFile(null);
        setDescription('');
    };

    const openUploadModal = () => {
        setIsUploadModalOpen(true);
    };

    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
        setNewFile(null);
        setNewFilename('');
        setDescription('');
    };

    const handleFileChange = (e) => {
        setNewFile(e.target.files[0]);
    };

    const handleEditDocument = async () => {
        const formData = new FormData();
        formData.append('filename', newFilename);
        formData.append('file', newFile);
        formData.append('description', description);

        try {
            await axios.put(`/api/documents/${currentDocument._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Document updated successfully!');
            closeEditModal();
            fetchDocuments();
        } catch (error) {
            console.error('Error updating document:', error);
            toast.error('Failed to update document.');
        }
    };

    const confirmDeleteDocument = (doc) => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            handleDeleteDocument(doc._id);
        }
    };

    const handleDeleteDocument = async (documentId) => {
        try {
            await axios.delete(`/api/documents/${documentId}`);
            setDocuments(documents.filter(doc => doc._id !== documentId));
            toast.success('Document deleted successfully!');
        } catch (error) {
            console.error('Error deleting document:', error);
            toast.error('Failed to delete document.');
        }
    };

    const handleUploadDocument = async () => {
        const formData = new FormData();
        formData.append('userId', user._id);
        formData.append('filename', newFilename);
        formData.append('file', newFile);
        formData.append('description', description);

        try {
            await axios.post('/api/documents/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Document uploaded successfully!');
            closeUploadModal();
            fetchDocuments();
        } catch (error) {
            console.error('Error uploading document:', error);
            toast.error('Failed to upload document.');
        }
    };

    const handlePreviewDocument = (documentId) => {
        const previewUrl = `/api/documents/preview/${documentId}`;
        window.open(previewUrl, '_blank'); // Open file in a new tab for preview
    };

    const handleDownloadDocument = async (documentId) => {
        try {
            const response = await axios.get(`/api/documents/download/${documentId}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'document.pdf'); // Set file name based on actual file type
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading document:', error);
            toast.error('Failed to download document.');
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.dashboard}>
            <ToastContainer />
            <Sidebar activeComponent={'documents'} />
            <div className={styles.content}>
                <header className={styles.header}>
                    <GreetingHeader username="Lekan" />
                </header>

                <div className={styles.mainSection}>
                    <h2 className={styles.sectionTitle}>Documents</h2>
                    <div className={styles.rowContainer}>
                        <div className={styles.searchContainer}>
                            <input type="text" placeholder="Search documents" className={styles.searchInput} />
                            <button className={styles.addButton} onClick={openUploadModal}>+</button>
                        </div>
                        <div className={styles.sortContainer}>
                            <div className={styles.sortOptions}>
                                <select className={styles.select} onChange={(e) => setSelectedMonth(e.target.value)}>
                                    <option>This Month</option>
                                    <option>Last Month</option>
                                    <option>All Time</option>
                                </select>
                                <select className={styles.select} onChange={(e) => setSelectedFileType(e.target.value)}>
                                    <option>Documents</option>
                                    <option>Images</option>
                                    <option>PDFs</option>
                                </select>
                            </div>
                            <button className={styles.sortButton} onClick={() => setSortOption(sortOption === 'Date' ? 'Name' : 'Date')}>
                                Sort by {sortOption}
                            </button>
                        </div>
                    </div>

                    <div className={styles.documentsList}>
                        {documents.map(doc => (
                            <div className={styles.documentItem} key={doc._id}>
                                <div className={styles.icon}>
                                    <FaRegFileLines />
                                </div>
                                <div className={styles.documentDetails}>
                                    <h3>{doc.filename}</h3>
                                    <p className={styles.uploadUser}>{doc.userId.firstName} {doc.userId.lastName}</p>
                                </div>
                                <div className={styles.documentDate}>
                                    <p className={styles.uploadDate}>{new Date(doc.uploadDate).toLocaleDateString()}</p>
                                </div>
                                <div className={styles.actions}>
                                    <button onClick={() => handlePreviewDocument(doc._id)} className={styles.editButton}>
                                        <VscOpenPreview />
                                    </button>
                                    <button onClick={() => handleDownloadDocument(doc._id)} className={styles.editButton}>
                                        <FaDownload />
                                    </button>
                                    <button className={styles.editButton} onClick={() => openEditModal(doc)}>
                                        <MdOutlineModeEdit />
                                    </button>
                                    <button className={styles.deleteButton} onClick={() => confirmDeleteDocument(doc)}>
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

                        {/* Edit Document Modal */}
                        <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                className={styles.modalContent}
                overlayClassName={styles.modalOverlay}
            >
                <h2>Edit Document</h2>
                <input
                    type="text"
                    value={newFilename}
                    onChange={(e) => setNewFilename(e.target.value)}
                    placeholder="New filename"
                    className={styles.inputField}
                />
                <input type="file" onChange={handleFileChange} className={styles.inputField} />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className={styles.textAreaField}
                />
                <div className={styles.actionButtons}>
                    <button onClick={handleEditDocument} className={styles.saveTaskBtn}>
                        Save Changes <FaSave />
                    </button>
                    <button onClick={closeEditModal} className={styles.cancelTaskBtn}>
                        Cancel <MdCancel />
                    </button>
                </div>
            </Modal>

            {/* Upload Document Modal */}
            <Modal
                isOpen={isUploadModalOpen}
                onRequestClose={closeUploadModal}
                className={styles.modalContent}
                overlayClassName={styles.modalOverlay}
            >
                <h2>Upload Document</h2>
                <input
                    type="text"
                    value={newFilename}
                    onChange={(e) => setNewFilename(e.target.value)}
                    placeholder="Filename"
                    className={styles.inputField}
                />
                <input type="file" onChange={handleFileChange} className={styles.inputField} />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className={styles.textAreaField}
                />
                <div className={styles.actionButtons}>
                    <button onClick={handleUploadDocument} className={styles.saveTaskBtn}>
                        Upload <FaUpload />
                    </button>
                    <button onClick={closeUploadModal} className={styles.cancelTaskBtn}>
                        Cancel <MdCancel />
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Documents;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';
// import GreetingHeader from '../components/GreetingHeader';
// import styles from './styles/Documents.module.css';
// import Modal from 'react-modal';
// import { FaRegFileLines } from "react-icons/fa6";
// import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
// import { VscOpenPreview } from "react-icons/vsc";
// import { FaDownload } from "react-icons/fa6";
// import { FaUpload, FaSave } from "react-icons/fa";
// import { MdCancel } from "react-icons/md";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Documents = () => {
//     const [user, setUser] = useState('');
//     const [documents, setDocuments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//     const [currentDocument, setCurrentDocument] = useState(null);
//     const [newFilename, setNewFilename] = useState('');
//     const [newFile, setNewFile] = useState(null);
//     const [description, setDescription] = useState('');

//     useEffect(() => {
//         const fetchDocuments = async () => {
//             try {
//                 const response = await axios.get('/api/documents');
//                 setDocuments(response.data);

//                 const storedUserId = localStorage.getItem('userId');
//                 if (storedUserId) {
//                     const userResponse = await axios.get(`/api/users/get-user-by-id/${storedUserId}`);
//                     setUser(userResponse.data.user);
//                 }
//             } catch (error) {
//                 console.error('Error fetching documents:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDocuments();
//     }, []);

//     const openEditModal = (doc) => {
//         setCurrentDocument(doc);
//         setNewFilename(doc.filename);
//         setDescription(doc.description);
//         setIsEditModalOpen(true);
//     };

//     const closeEditModal = () => {
//         setIsEditModalOpen(false);
//         setCurrentDocument(null);
//         setNewFile(null);
//         setDescription('');
//     };

//     const openUploadModal = () => {
//         setIsUploadModalOpen(true);
//     };

//     const closeUploadModal = () => {
//         setIsUploadModalOpen(false);
//         setNewFile(null);
//         setNewFilename('');
//         setDescription('');
//     };

//     const handleFileChange = (e) => {
//         setNewFile(e.target.files[0]);
//     };

//     const handleEditDocument = async () => {
//         const formData = new FormData();
//         formData.append('filename', newFilename);
//         formData.append('file', newFile);
//         formData.append('description', description);

//         try {
//             await axios.put(`/api/documents/${currentDocument._id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             toast.success('Document updated successfully!');
//             closeEditModal();
//             const response = await axios.get('/api/documents');
//             setDocuments(response.data);
//         } catch (error) {
//             console.error('Error updating document:', error);
//             toast.error('Failed to update document.');
//         }
//     };

//     const confirmDeleteDocument = (doc) => {
//         if (window.confirm('Are you sure you want to delete this document?')) {
//             handleDeleteDocument(doc._id);
//         }
//     };

//     const handleDeleteDocument = async (documentId) => {
//         try {
//             await axios.delete(`/api/documents/${documentId}`);
//             setDocuments(documents.filter(doc => doc._id !== documentId));
//             toast.success('Document deleted successfully!');
//         } catch (error) {
//             console.error('Error deleting document:', error);
//             toast.error('Failed to delete document.');
//         }
//     };

//     const handleUploadDocument = async () => {
//         const formData = new FormData();
//         formData.append('userId', user._id);
//         formData.append('filename', newFilename);
//         formData.append('file', newFile);
//         formData.append('description', description);

//         try {
//             await axios.post('/api/documents/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             toast.success('Document uploaded successfully!');
//             closeUploadModal();
//             const response = await axios.get('/api/documents'); // Refetch documents
//             setDocuments(response.data);
//         } catch (error) {
//             console.error('Error uploading document:', error);
//             toast.error('Failed to upload document.');
//         }
//     };

//     const handlePreviewDocument = (documentId) => {
//         const previewUrl = `/api/documents/preview/${documentId}`;
//         window.open(previewUrl, '_blank'); // Open file in a new tab for preview
//     };

//     const handleDownloadDocument = async (documentId) => {
//         try {
//             const response = await axios.get(`/api/documents/download/${documentId}`, {
//                 responseType: 'blob',
//             });
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', 'document.pdf'); // Set file name based on actual file type
//             document.body.appendChild(link);
//             link.click();
//         } catch (error) {
//             console.error('Error downloading document:', error);
//             toast.error('Failed to download document.');
//         }
//     };

//     if (loading) {
//         return <div className={styles.loading}>Loading...</div>;
//     }

//     return (
//         <div className={styles.dashboard}>
//             <ToastContainer />
//             <Sidebar activeComponent={'documents'} />
//             <div className={styles.content}>
//                 <header className={styles.header}>
//                     <GreetingHeader username="Lekan" />
//                 </header>

//                 <div className={styles.mainSection}>
//                     <h2 className={styles.sectionTitle}>Documents</h2>
//                     {/* <div className={styles.actions}>
//                         <input type="text" placeholder="Search documents" className={styles.searchInput} />
//                         <button className={styles.addButton} onClick={openUploadModal}>+</button>
//                     </div> */}
//                     <div className={styles.rowContainer}>
//                         <div className={styles.searchContainer}>
//                             <input type="text" placeholder="Search documents" className={styles.searchInput} />
//                             <button className={styles.addButton} onClick={openUploadModal}>+</button>
//                         </div>
//                         <div className={styles.sortContainer}>
//                             <div className={styles.sortOptions}>
//                                 <select className={styles.select}>
//                                     <option>This Month</option>
//                                     <option>Last Month</option>
//                                     <option>All Time</option>
//                                 </select>
//                                 <select className={styles.select}>
//                                     <option>Documents</option>
//                                     <option>Images</option>
//                                     <option>PDFs</option>
//                                 </select>
//                             </div>
//                             <button className={styles.sortButton}>
//                                 Sort by <MdOutlineModeEdit />
//                             </button>
//                         </div>
//                     </div>

//                     <div className={styles.documentsList}>
//                         {documents.map(doc => (
//                             <div className={styles.documentItem} key={doc._id}>
//                                 <div className={styles.icon}>
//                                     <FaRegFileLines />
//                                 </div>
//                                 <div className={styles.documentDetails}>
//                                     <h3>{doc.filename}</h3>
//                                     <p className={styles.uploadUser}>{doc.userId.firstName} {doc.userId.lastName}</p>
//                                 </div>
//                                 <div className={styles.documentDate}>
//                                     <p className={styles.uploadDate}>{new Date(doc.uploadDate).toLocaleDateString()}</p>
//                                 </div>
//                                 <div className={styles.actions}>
//                                     <button onClick={() => handlePreviewDocument(doc._id)} className={styles.editButton}>
//                                         <VscOpenPreview />
//                                     </button>
//                                     <button onClick={() => handleDownloadDocument(doc._id)} className={styles.editButton}>
//                                         <FaDownload />
//                                     </button>
//                                     <button className={styles.editButton} onClick={() => openEditModal(doc)}>
//                                         <MdOutlineModeEdit />
//                                     </button>
//                                     <button className={styles.deleteButton} onClick={() => confirmDeleteDocument(doc)}>
//                                         <MdDelete />
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Edit Document Modal */}
//             <Modal
//                 isOpen={isEditModalOpen}
//                 onRequestClose={closeEditModal}
//                 className={styles.modalContent}
//                 overlayClassName={styles.modalOverlay}
//             >
//                 <h2>Edit Document</h2>
//                 <input
//                     type="text"
//                     value={newFilename}
//                     onChange={(e) => setNewFilename(e.target.value)}
//                     placeholder="New filename"
//                     className={styles.inputField}
//                 />
//                 <input type="file" onChange={handleFileChange} className={styles.inputField} />
//                 <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Description"
//                     className={styles.textAreaField}
//                 />
//                 <div className={styles.actionButtons}>
//                     <button onClick={handleEditDocument} className={styles.saveTaskBtn}>Save Changes <FaSave /></button>
//                     <button onClick={closeEditModal} className={styles.cancelTaskBtn}>Cancel <MdCancel /></button>
//                 </div>
//             </Modal>

//                         {/* Upload Document Modal */}
//             <Modal
//                 isOpen={isUploadModalOpen}
//                 onRequestClose={closeUploadModal}
//                 className={styles.modalContent}
//                 overlayClassName={styles.modalOverlay}
//             >
//                 <h2>Upload Document</h2>
//                 <input
//                     type="text"
//                     value={newFilename}
//                     onChange={(e) => setNewFilename(e.target.value)}
//                     placeholder="Filename"
//                     className={styles.inputField}
//                 />
//                 <input type="file" onChange={handleFileChange} className={styles.inputField} />
//                 <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Description"
//                     className={styles.textAreaField}
//                 />
//                 <div className={styles.actionButtons}>
//                     <button onClick={closeUploadModal} className={styles.cancelTaskBtn}>Cancel <MdCancel /></button>
//                     <button onClick={handleUploadDocument} className={styles.saveTaskBtn}>Upload <FaUpload /></button>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default Documents;