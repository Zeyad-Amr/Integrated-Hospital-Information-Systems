class UtilsFunctions {
    startsWithArabic = (text: any) => {

        // Ensure text is a string
        if (typeof text !== 'string') {
            return false;
        }

        // Ensure text is defined
        text = text || '';

        // Define the range of character codes for Arabic script
        const arabicRange = [0x0600, 0x06FF]; // Arabic Unicode block

        // Check if the first character in the text falls within the Arabic range
        const firstCharCode = text.trim().charCodeAt(0);
        return firstCharCode >= arabicRange[0] && firstCharCode <= arabicRange[1];
    }
}

const utilsFunctions = new UtilsFunctions();
export default utilsFunctions;