
document.addEventListener('DOMContentLoaded', function() {
    let searchInProgress = false; // Flag to track if search is in progress

    // Add event listener for the click event on the search button
    document.getElementById('submitBtn').addEventListener('click', function() {
        startSearch(); // Handle the start of the search
    });

    // Add event listener for the keydown event on the input field
    document.getElementById('searchInput').addEventListener('keydown', function(event) {
        // Check if the key pressed is the "Enter" key
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission behavior
            startSearch(); // Handle the start of the search
        }
    });

    // Function to handle the start of a search
    function startSearch() {
        // Check if search is already in progress
        if (!searchInProgress) {
            searchInProgress = true; // Set search in progress
            showLoadingIndicator(); // Show loading indicator
            checkAddresses().then(() => {
                searchInProgress = false; // Reset search in progress once search is completed
                hideLoadingIndicator(); // Hide loading indicator
            });
        }
    }
});

//shows loading indicator when search is in progress
function showLoadingIndicator() {
    // Check if the loading indicator already exists, to avoid adding it multiple times
    if (!document.getElementById('loadingIndicator')) {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'loadingIndicator';
        loadingIndicator.textContent = 'Loading...'; 
        document.body.appendChild(loadingIndicator);
    }
}

//hides loading indicator
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.remove(); // Remove the loading indicator from the DOM
    }
}



// API keys
const ETHERSCAN_API_KEY = '1HWJHSF6G9SJT2CU9RNM5N58E13AW129HD';
const BSCSCAN_API_KEY = 'VQYPXS3GRF65FQ8SJYZDWJQ66UMTF1YWET';
const POLYGONSCAN_API_KEY = 'RWXNYJEKADKA79FUFJFMY2SETP4MC5BHJJ';
const LINEASCAN_API_KEY = '9UVSIK8RQJDUWNYJCPWF1SWJP3FYZD2TTV';
const ARBISCAN_API_KEY = 'MNSUA6Z65DKV5UADBE8CHI6BZ6D2AAHIUU';
const OPTIMISM_API_KEY = 'EG76PY67VYHFWS8VFDEQ9Q3S3T1P3PNSUE';
const BASESCAN_API_KEY = '1GVW8EKC7DMFAYJU6P8T2Z2C8GISJSTKAF';
const FTMSCAN_API_KEY = '5ZQFBBN1W9UAMFAMXCAAH85SIIBJYW4EIJ';
const ZKSYNC_API_KEY = 'NX3U959DXUEW8ECSX64TV2W2X5RMMMK5IF';



//Get input and check if it is a wallet address or transaction hash
async function checkAddresses() {
    const addressOrTxHash = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (addressOrTxHash.length === 42) {
        await checkWalletAddress(addressOrTxHash);
    } else if (addressOrTxHash.length === 66) {
        await checkTransactionHash(addressOrTxHash);
    } else {
        alert('Please enter a valid wallet address or transaction hash.');
    }
}


//If in put is a Wallet address. Checks API's and pushes results to webpage
async function checkWalletAddress(address) {

    const resultsContainer = document.getElementById('resultsContainer');
    
    // Blockchain API URLs
    const etherscanUrls = [
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${ETHERSCAN_API_KEY}`,
        `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=1&sort=asc&apikey=${ETHERSCAN_API_KEY}`,
        `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=1&startblock=0&endblock=27025780&sort=asc&apikey=${ETHERSCAN_API_KEY}`,
    ];

    const bscscanUrls = [
        `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${BSCSCAN_API_KEY}`,
        `https://api.bscscan.com/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=1&sort=asc&apikey=${BSCSCAN_API_KEY}`,
        `https://api.bscscan.com/api?module=account&action=tokentx&address=${address}&page=1&offset=1&startblock=0&endblock=999999999&sort=asc&apikey=${BSCSCAN_API_KEY}`,
    ];

    const polygonscanUrls = [
        `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${POLYGONSCAN_API_KEY}`,
        `https://api.polygonscan.com/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=1&sort=asc&apikey=${POLYGONSCAN_API_KEY}`,
        `https://api.polygonscan.com/api?module=account&action=tokentx&address=${address}&page=1&offset=1&startblock=0&endblock=999999999&sort=asc&apikey=${POLYGONSCAN_API_KEY}`,
    ];

    const lineascanUrls = [
        `https://api.lineascan.build/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${LINEASCAN_API_KEY}`,
        `https://api.lineascan.build/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=1&sort=asc&apikey=${LINEASCAN_API_KEY}`,
        `https://api.lineascan.build/api?module=account&action=tokentx&address=${address}&page=1&offset=1&startblock=0&endblock=27025780&sort=asc&apikey=${LINEASCAN_API_KEY}`,
    ];

    const arbiscanUrls = [
        `https://api.arbiscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${ARBISCAN_API_KEY}`,
        `https://api.arbiscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=1&sort=asc&apikey=${ARBISCAN_API_KEY}`,
        `https://api.arbiscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=1&startblock=0&endblock=999999999&sort=asc&apikey=${ARBISCAN_API_KEY}`,
    ];

    const basescanUrls = [
        `https://api.basescan.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${BASESCAN_API_KEY}`,
        `https://api.basescan.org/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=1&sort=asc&apikey=${BASESCAN_API_KEY}`,
        `https://api.basescan.org/api?module=account&action=tokentx&address=${address}&page=1&offset=1&startblock=0&endblock=27025780&sort=asc&apikey=${BASESCAN_API_KEY}`,
    ];

    const optimismUrls = [
        `https://api-optimistic.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${OPTIMISM_API_KEY}`,
        `https://api-optimistic.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=1&sort=asc&apikey=${OPTIMISM_API_KEY}`,
        `https://api-optimistic.etherscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=1&startblock=0&endblock=999999999&sort=asc&apikey=${OPTIMISM_API_KEY}`,
    ];

    const ftmscanUrls = [
        `https://api.ftmscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${FTMSCAN_API_KEY}`,
        `https://api.ftmscan.com/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=1&sort=asc&apikey=${FTMSCAN_API_KEY}`,
        `https://api.ftmscan.com/api?module=account&action=tokentx&address=${address}&page=1&offset=1&startblock=0&endblock=27025780&sort=asc&apikey=${FTMSCAN_API_KEY}`,

    ];

    const zksyncUrls = [
        `https://api-era.zksync.network/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${ZKSYNC_API_KEY}`,
        `https://api-era.zksync.network/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=1&sort=asc&apikey=${ZKSYNC_API_KEY}`,
        `https://api-era.zksync.network/api?module=account&action=tokentx&address=${address}&page=1&offset=1&startblock=0&endblock=27025780&sort=asc&apikey=${ZKSYNC_API_KEY}`,
    ];


    //Add chain information
    const addressChecks = [
        { url: etherscanUrls, apiName: "Etherscan", domain: "io"},
        { url: bscscanUrls, apiName: "BSCscan", domain: "com"},
        { url: polygonscanUrls, apiName: "Polygonscan", domain: "com"},
        { url: lineascanUrls, apiName: "Lineascan", domain: "build"},
        { url: arbiscanUrls, apiName: "Arbiscan", domain: "io"},
        { url: basescanUrls, apiName: "Basescan", domain: "org"},
        { url: optimismUrls, apiName: "Optimistic", domain: "etherscan.io"},
        { url: ftmscanUrls, apiName: "FTMscan", domain: "com" },
        { url: zksyncUrls, apiName: "era.zksync", domain: "network"},
    ];
    

    let noResultsCounter = 0;

        //goes through array of blockchains, checks API's, if results are found it creates a URL to the blockchains block explorer
    for (const { url, apiName, domain } of addressChecks) {
        let resultsFound = false; // Flag to track if results were found for this API
        for (const apiUrl of url) {
            const response = await fetch(apiUrl);
            const data = await response.json();
            // Adjusting the condition based on your suggestion
            if (data.result && data.result.length > 0) {
                const link = document.createElement('a');
                link.href = `https://${apiName.toLowerCase()}.${domain}/address/${address}`;
                link.textContent = `${apiName}`;
                link.target = "_blank";
                resultsContainer.appendChild(link);
                resultsContainer.appendChild(document.createElement('br')); // Add a line break for readability
                resultsFound = true; // Set flag to true since results were found
                // Break out of the inner loop since we found results
                break;
            }
        }
        // If no results found for the blockchains APIs, increment the counter
        if (!resultsFound) {
            noResultsCounter++;
        }
    }

        // Check if no results were found for all supported blockchains
        if (noResultsCounter === addressChecks.length) {
            appendResult("No results found on the supported blockchains.", resultsContainer);
        }

}

    



//If input is a TX hash
async function checkTransactionHash(txHash) {
    const resultsContainer = document.getElementById('resultsContainer');
    const etherscanTxUrl = `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${ETHERSCAN_API_KEY}`;
    const bscscanTxUrl = `https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${BSCSCAN_API_KEY}`;
    const polygonscanTxUrl = `https://api.polygonscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${POLYGONSCAN_API_KEY}`;
    const lineascanTxUrl = `https://api.lineascan.build/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${LINEASCAN_API_KEY}`;
    const arbiscanTxUrl = `https://api.arbiscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${ARBISCAN_API_KEY}`;
    const basescanTxUrl = `https://api.basescan.org/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${BASESCAN_API_KEY}`;
    const optimismTxUrl = `https://api-optimistic.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${OPTIMISM_API_KEY}`;
    const ftmscanTxUrl = `https://api.ftmscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${FTMSCAN_API_KEY}`;
    const zksyncTxUrl = `https://api-era.zksync.network/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${ZKSYNC_API_KEY}`;


    const txUrls = [
        { url: etherscanTxUrl, apiName: "Etherscan", domain: "io"},
        { url: bscscanTxUrl, apiName: "BSCscan", domain: "com" },
        { url: polygonscanTxUrl, apiName: "Polygonscan", domain: "com"},
        { url: lineascanTxUrl, apiName: "Lineascan", domain: "build"},
        { url: arbiscanTxUrl, apiName: "Arbiscan", domain: "io"},
        { url: basescanTxUrl, apiName: "Basescan", domain: "org"},
        { url: optimismTxUrl, apiName: "Optimistic", domain: "etherscan.io"},
        { url: ftmscanTxUrl, apiName: "FTMscan", domain: "com" },
        { url: zksyncTxUrl, apiName: "era.zksync", domain: "network" },

    ];
    
    //checks each blockchain's api for a result and if result is found posts URL on webpage
    for (const {url, apiName, domain} of txUrls) {
        const response = await fetch(url);
        const data = await response.json();
        //if there is at least 1 result on the API
        if (data.result && data.result.status === '1') {
            const link = document.createElement('a');
            link.href = `https://${apiName.toLowerCase()}.${domain}/tx/${txHash}`;
            link.textContent = `View transaction on ${apiName}`;
            link.target = "_blank";
            resultsContainer.appendChild(link);
           
        } else {
            const noResultMessage = document.createElement('p');
            noResultMessage.textContent = `No result found for ${apiName}`;
            noResultMessage.classList.add('no-result'); // Add a class to the paragraph element
            resultsContainer.appendChild(noResultMessage);
    
        }
    }
}


//Posts results
function appendResult(text, container) {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = text; // Use innerHTML to interpret HTML markup
    container.appendChild(paragraph);
}


