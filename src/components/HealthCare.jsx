// import { ethers } from 'ethers';
// import React, { useState, useEffect } from 'react';

// const HealthCare = () => {

//     const address = "0xb79d4e5de335d45cc7bf54826dafb88db38afe6e";
//     const ABI = [
//         {
//             "inputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "patientID",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "string",
//                     "name": "patientName",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "string",
//                     "name": "diagnosis",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "string",
//                     "name": "tretment",
//                     "type": "string"
//                 }
//             ],
//             "name": "addRecored",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "_provider",
//                     "type": "address"
//                 }
//             ],
//             "name": "authorizeProvider",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "stateMutability": "nonpayable",
//             "type": "constructor"
//         },
//         {
//             "inputs": [],
//             "name": "getowner",
//             "outputs": [
//                 {
//                     "internalType": "address",
//                     "name": "",
//                     "type": "address"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "patientId",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "getRecords",
//             "outputs": [
//                 {
//                     "components": [
//                         {
//                             "internalType": "uint256",
//                             "name": "RecordId",
//                             "type": "uint256"
//                         },
//                         {
//                             "internalType": "string",
//                             "name": "PatientName",
//                             "type": "string"
//                         },
//                         {
//                             "internalType": "string",
//                             "name": "Diagnosis",
//                             "type": "string"
//                         },
//                         {
//                             "internalType": "string",
//                             "name": "Tretment",
//                             "type": "string"
//                         },
//                         {
//                             "internalType": "uint256",
//                             "name": "Timestamp",
//                             "type": "uint256"
//                         }
//                     ],
//                     "internalType": "struct HealthRecords.Record[]",
//                     "name": "",
//                     "type": "tuple[]"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "owner",
//             "outputs": [
//                 {
//                     "internalType": "address",
//                     "name": "",
//                     "type": "address"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         }];

//     const [providers, setProviders] = useState(null);
//     const [signer, setSigner] = useState(null);
//     const [account, setAccount] = useState(null);
//     const [contract, setContract] = useState(null);
//     const [IsOwner, setIsOwner] = useState(null);
//     const [authorizeProvider, setAuthorizeProvider] = useState('');
//     const [patientID, setPatientID] = useState('')
//     const [patient, setPatient] = useState([])

//     const [patientName, setpatientName] = useState('')
//     const [diagnosis, setdiagnosis] = useState('')
//     const [tretment, settretment] = useState('')


//     const addPatient = async () => {
//         try {
//             const data = await contract.addRecored(patientID,patientName,diagnosis,tretment)
//             await data.wait()
//             getRecord();
//         } catch (error) {
//             console.log("Error in adding patient ", error)
//         }
//     }

//     useEffect(() => {
//         const connectWallet = async () => {
//             try {
//                 if (typeof window.ethereum !== 'undefined') {
//                     const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider
//                     await provider.send('eth_requestAccounts', []); // Connect to MetaMask
//                     setProviders(provider);

//                     const signer = await provider.getSigner(); // Account which has been connected to MetaMask
//                     setSigner(signer);

//                     const accountAddress = await signer.getAddress(); // Address of account connected to MetaMask
//                     setAccount(accountAddress);

//                     const contract = new ethers.Contract(address, ABI, signer); // Pass signer to the contract
//                     setContract(contract);

//                     const ownerAddress = await contract.getowner();
//                     setIsOwner(accountAddress.toLowerCase() === ownerAddress.toLowerCase());
//                     console.log(ownerAddress)
//                 } else {
//                     console.log('MetaMask is not installed!');
//                 }
//             } catch (error) {
//                 console.log("Error connecting to wallet...", error);
//             }
//         };
//         connectWallet();
//     }, []);

//     const authorizeProviderfn = async () => {
//         try {
//             const tx = await contract.authorizeProvider(authorizeProvider);
//             await tx.wait();

//         } catch (error) {
//             console.log("You are not Owner", error)
//         }
//     }

//     const getRecord = async () => {
//         try {
//             const records = await contract.getRecords(patientID);
//             console.log("Patient Record : ", records)
//             setPatient(records);

//         } catch (error) {
//             console.log("Error in fetching the record ", error)
//         }
//     }

//     return (
//         <div className='flex flex-col items-center'>
//             <h1 className='font-bold text-2xl mt-10'>HealthCare Smart Contract Interaction</h1>
//             {account && <p className='mt-4'>Connected Account: {account}</p>}

//             <div className="form">
//                 <h1>Authorize Provider</h1>
//                 <input type="text" placeholder='Authorize Provider' value={authorizeProvider} onChange={(e) => setAuthorizeProvider(e.target.value)} />
//                 <button onClick={authorizeProviderfn}>Authorize Provider</button>
//             </div>

//             <div>
//                 <h1>Fetch Patient</h1>
//                 <input type="text" placeholder='Patient ID' value={patientID} onChange={(e) => setPatientID(e.target.value)} />
//                 <button onClick={getRecord}>Get Record</button>

//                 {
//                     patient && 
//                         patient.map(()=>(
//                             <h1>{''}</h1>
//                         ))
                    
//                 }
//             </div>

//             <div>
//                 <h1>Add Record</h1>
//                 <input type="text" value={patientID} placeholder='Patient Id' onChange={(e)=>setPatientID(e.target.value)} />
//                 <input type="text" value={patientName} placeholder="Patient Name" onChange={(e)=>setpatientName(e.target.value)}  />
//                 <input type="text" value={diagnosis} placeholder="Diagnosis" onChange={(e)=>setdiagnosis(e.target.value)}/>
//                 <input type="text" value={tretment} placeholder="Treatment" onChange={(e)=>settretment(e.target.value)}/>

//                 <button onClick={addPatient}>Add Patient</button>
//             </div>
//         </div>
//     );
// };

// export default HealthCare;

import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';

const HealthCare = () => {
    const address = "0xb79d4e5de335d45cc7bf54826dafb88db38afe6e";
    const ABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "patientID",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "patientName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "diagnosis",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "tretment",
                    "type": "string"
                }
            ],
            "name": "addRecored",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_provider",
                    "type": "address"
                }
            ],
            "name": "authorizeProvider",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "getowner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "patientId",
                    "type": "uint256"
                }
            ],
            "name": "getRecords",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "RecordId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "PatientName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "Diagnosis",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "Tretment",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "Timestamp",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct HealthRecords.Record[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }];

    const [providers, setProviders] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    // Separate states for search and add functionality
    const [searchPatientID, setSearchPatientID] = useState('');
    const [addPatientID, setAddPatientID] = useState('');
    const [patient, setPatient] = useState([]);
    const [patientRecords, setPatientRecords] = useState([]);
    
    // Form states
    const [authorizeProvider, setAuthorizeProvider] = useState('');
    const [patientName, setPatientName] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 5000);
    };

    const addPatient = async () => {
        if (!addPatientID || !patientName || !diagnosis || !treatment) {
            showNotification('Please fill all fields', 'error');
            return;
        }

        try {
            setLoading(true);
            const data = await contract.addRecored(addPatientID, patientName, diagnosis, treatment);
            await data.wait();
            showNotification('Patient record added successfully!');
            
            // If we're adding a record for the currently searched patient, refresh the records
            if (addPatientID === searchPatientID) {
                getRecord();
            }
            
            // Reset form
            setPatientName('');
            setDiagnosis('');
            setTreatment('');
        } catch (error) {
            console.log("Error in adding patient ", error);
            showNotification('Failed to add patient record', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const connectWallet = async () => {
            try {
                if (typeof window.ethereum !== 'undefined') {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    await provider.send('eth_requestAccounts', []);
                    setProviders(provider);

                    const signer = await provider.getSigner();
                    setSigner(signer);

                    const accountAddress = await signer.getAddress();
                    setAccount(accountAddress);

                    const contract = new ethers.Contract(address, ABI, signer);
                    setContract(contract);

                    const ownerAddress = await contract.getowner();
                    setIsOwner(accountAddress.toLowerCase() === ownerAddress.toLowerCase());
                    console.log(ownerAddress);
                } else {
                    console.log('MetaMask is not installed!');
                    showNotification('MetaMask is not installed!', 'error');
                }
            } catch (error) {
                console.log("Error connecting to wallet...", error);
                showNotification('Error connecting to wallet', 'error');
            }
        };
        connectWallet();
    }, []);

    const authorizeProviderFn = async () => {
        if (!authorizeProvider) {
            showNotification('Please enter provider address', 'error');
            return;
        }

        try {
            setLoading(true);
            const tx = await contract.authorizeProvider(authorizeProvider);
            await tx.wait();
            showNotification('Provider authorized successfully!');
            setAuthorizeProvider('');
        } catch (error) {
            console.log("Error authorizing provider", error);
            showNotification('You are not the owner or encountered an error', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getRecord = async () => {
        if (!searchPatientID) {
            showNotification('Please enter Patient ID', 'error');
            return;
        }

        try {
            setLoading(true);
            const records = await contract.getRecords(searchPatientID);
            console.log("Patient Record: ", records);
            
            // Process the records to extract the actual data
            const processedRecords = [];
            
            if (records && records.length > 0) {
                for (let i = 0; i < records.length; i++) {
                    // Access the elements within the proxy object
                    const record = records[i];
                    
                    // Check if the record has nested proxy objects
                    if (record && typeof record === 'object') {
                        // Extract the data from the record
                        const processedRecord = {
                            RecordId: record[0] ? record[0].toString() : 'N/A',
                            PatientName: record[1] || 'N/A',
                            Diagnosis: record[2] || 'N/A',
                            Treatment: record[3] || 'N/A',
                            Timestamp: record[4] ? record[4].toString() : 'N/A'
                        };
                        
                        processedRecords.push(processedRecord);
                    }
                }
            }
            
            setPatientRecords(processedRecords);
            setPatient(records);
            
            if (processedRecords.length === 0) {
                showNotification('No records found for this patient ID', 'info');
            } else {
                showNotification(`Found ${processedRecords.length} record(s)`);
            }
        } catch (error) {
            console.log("Error in fetching the record ", error);
            showNotification('Error fetching records', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Format timestamp to readable date
    const formatDate = (timestamp) => {
        if (!timestamp || timestamp === 'N/A') return 'N/A';
        try {
            const date = new Date(Number(timestamp) * 1000);
            return date.toLocaleString();
        } catch (error) {
            return 'Invalid Date';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
            {/* Notification */}
            {notification.show && (
                <div className={`fixed top-4 right-4 px-4 py-3 rounded shadow-lg max-w-sm z-50 ${
                    notification.type === 'error' ? 'bg-red-500 text-white' :
                    notification.type === 'info' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                }`}>
                    {notification.message}
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-blue-800 mb-4">HealthCare Blockchain Platform</h1>
                    {account ? (
                        <div className="bg-white rounded-lg p-3 shadow inline-flex items-center">
                            <div className={`h-3 w-3 rounded-full mr-2 ${isOwner ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                            <span className="text-gray-700 font-medium text-sm truncate">{account}</span>
                            {isOwner && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Owner</span>}
                        </div>
                    ) : (
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                            Connect Wallet
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Authorize Provider Section */}
                    {isOwner && (
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                                Authorize Healthcare Provider
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Provider Address</label>
                                    <input 
                                        type="text" 
                                        placeholder="0x..." 
                                        value={authorizeProvider} 
                                        onChange={(e) => setAuthorizeProvider(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button 
                                    onClick={authorizeProviderFn}
                                    disabled={loading || !isOwner}
                                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Processing...' : 'Authorize Provider'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Fetch Patient Section */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
                            </svg>
                            Find Patient Records
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter patient ID" 
                                    value={searchPatientID} 
                                    onChange={(e) => setSearchPatientID(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button 
                                onClick={getRecord}
                                disabled={loading}
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Searching...' : 'Find Records'}
                            </button>
                        </div>
                    </div>

                    {/* Add Record Section */}
                    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Add Patient Record
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                                <input 
                                    type="text" 
                                    placeholder="Patient ID" 
                                    value={addPatientID} 
                                    onChange={(e) => setAddPatientID(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Patient Name" 
                                    value={patientName} 
                                    onChange={(e) => setPatientName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                                <input 
                                    type="text" 
                                    placeholder="Diagnosis" 
                                    value={diagnosis} 
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
                                <input 
                                    type="text" 
                                    placeholder="Treatment" 
                                    value={treatment} 
                                    onChange={(e) => setTreatment(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <button 
                                    onClick={addPatient}
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Adding Record...' : 'Add Patient Record'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Patient Records Display */}
                {patientRecords.length > 0 && (
                    <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            Patient Records for ID: {searchPatientID}
                        </h2>
                        
                        {/* Records cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {patientRecords.map((record, index) => (
                                <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                            Record #{record.RecordId}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {formatDate(record.Timestamp)}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1">{record.PatientName}</h3>
                                    <div className="grid grid-cols-1 gap-2 mt-3">
                                        <div>
                                            <span className="text-xs text-gray-500 block">Diagnosis</span>
                                            <span className="text-gray-800">{record.Diagnosis}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 block">Treatment</span>
                                            <span className="text-gray-800">{record.Treatment}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Records table for detailed view */}
                        <div className="overflow-x-auto mt-4">
                            <h3 className="text-md font-medium text-gray-700 mb-2">Detailed Records</h3>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {patientRecords.map((record, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {record.RecordId}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.PatientName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.Diagnosis}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.Treatment}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(record.Timestamp)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthCare;