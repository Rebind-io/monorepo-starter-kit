import bcrypt from 'bcrypt';

class HashPassword {
  saltRounds = 10;

  /**
   * Hashes a plain text password.
   * @param password {string} The plain text password to hash.
   * @returns {Promise<string>} The hashed password.
   */
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compares a plain text password with a hashed password.
   * @param password {string} The plain text password to compare.
   * @param hashedPassword {string} The hashed password to compare against.
   * @returns {Promise<boolean>} True if the passwords match, false otherwise.
   */
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

const hashPassword = new HashPassword();
export default hashPassword;
