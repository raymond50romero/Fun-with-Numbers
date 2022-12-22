/**
 * a file that does all of the mathematics of prime numbers 
 * 
 * Name: Raymond Romero
 * Email: raymond50romero@gmail.com
 */

/**
 * find the prime number at the given location 
 * 
 * @param {number} location the location of prime we want to find 
 * @returns {number} prime number at location given by num
 */
export function findPrime(location) {
    // look to see if there exists a list of primes
    let primes = retreivePrimes();
    
    // if there does exist a list then return the prime we want
    if (primes != null) {
        // get prime at location 
        if (location < primes.length) return primes[location];
        // if location is larger than primes then update the array
        else {
            primes = updatePrimeArray(primes, location); 
            storePrimes(primes);
            return primes[location];
        }
    }
    // if it does not exist then we make a new one and store it
    else {
        // add the first prime to the list 
        // cannot start with 1 because logic will not work
        primes[0] = 2;
        primes = updatePrimeArray(primes, location);
        storePrimes(primes);
        return primes[location];
    }
}

/**
 * sum up all of the prime numbers up to a given location.
 * user inputs 500 and will get the sum of all prime numbers up to the 500th prime
 * 
 * @param {number} location location of up to what number to sum
 * @returns returns a sum of all prime numbers up to given location
 */
export function sumOfPrimes(location) {
    // get primes that are stored, returns null if no list exists
    let primes = retreivePrimes();
    // total sum of the primes 
    let totalSum = 0;
    // if we have a
    if (primes != null) {
        // if location < primes.length then we have all the primes needed
        if (location <= primes.length) {
            // sum all the primes up to given location and return sum
            for (let i=0; i<location; i++) totalSum = totalSum + primes[i];
            return totalSum;
        }
        // if location is higher than primes then we have to make the new list of primes
        else {
            primes = updatePrimeArray(primes, location);
            storePrimes(primes);
            for (let i=0; i<location; i++) totalSum = totalSum + primes[i];
            return totalSum;
        }
    }
    else {
        primes[0] = 2;
        primes = updatePrimeArray(primes, location);
        storePrimes(primes);
        for (let i=0; i<location; i++) totalSum = totalSum + primes[i];
        return totalSum;
    }
}

/**
 * checks to see if the number is prime
 * 
 * @param {number} n 
 * @returns true if the number is prime, false otherwise
 */
function isPrime(n) {
    // get the square root of the number and round up 
    // we only need to check up to the square root of the number we are testing for prime
    let numSquared = Math.ceil(Math.sqrt(n));
    // check count up to square root to see if the number is prime
    let checkNum = 2;
    while (checkNum <= numSquared) {
        // if the number we are checking mod another is 0 then it is not prime 
        if (numSquared%checkNum == 0) return false;
        checkNum++;
    }
    return true;
}

/**
 * update array with new list of prime numbers up to the given location
 * 
 * @param {Array} primes array of prime numbers
 * @param {number} location up to what location to update the array of primes
 * 
 * @returns return updated array of prime numbers up to the given location
 */
function updatePrimeArray(primes, location) {
    // check to see if prime array passed is null
    if (primes == null || primes.length == 0) return null;
    // this is the array we will be updating 
    let updatedPrimes = primes;
    // this is our current number we are testing for primes 
    let currentNumber = primes[primes.length] + 1;
    // this is the current location we will be placing new primes in the array
    let currentLocation = primes.length;
    // loop through all numbers from currentNumber until we arrive at the new location
    while (currentLocation < location){
        /// check to see of the number is prime
        if (isPrime(currentNumber)) {
            // if it is prime then add it to the list 
            updatedPrimes[currentLocation] = currentNumber;
            currentLocation++;
        }
        currentNumber++;
    }
    return updatedPrimes;
}

/**
 * @todo implement this to store to a database instead of local storage
 * 
 * stores array of prime numbers into local storage (soon to be database)
 *
 * @param {number} primes array of prime numbers to store
 */
export function storePrimes(primes) {
    window.localStorage.setItem('primes', JSON.stringify(primes));
}

/**
 * look for array of prime numbers in storage 
 * 
 * @returns array of prime numbers 
 */
export function retreivePrimes() {
    const ifPrimes = JSON.parse(window.localStorage.getItem('primes'));

    // if array of prime numbers are not found then 
    if (ifPrimes != null) {
        return ifPrimes;
    } else return null;
}