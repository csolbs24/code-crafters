// Function to generate a random 4-digit number

function generateRandomNumber() {
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
}

export default generateRandomNumber;