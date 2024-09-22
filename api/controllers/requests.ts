import { Request, Response } from 'express';
import { Buffer } from 'buffer';
import * as mime from 'mime-types';

export async function PostRequest(req: Request, res: Response) {
    try {
        const { data, file_b64 } = req.body; // No need for await here
        const isNumber = (str: string) => !isNaN(Number(str));

        if (!Array.isArray(data)) {
            return res.status(400).json({ message: "Invalid data format", is_success: false });
        }

        const handleFile = (base64String: string) => {
            try {
                // Extract MIME type and data from base64 string
                const matches = base64String.match(/^data:(.*?);base64,(.*)$/);
                if (!matches || matches.length < 3) {
                    return {
                        file_valid: false,
                        file_mime_type: '',
                        file_size_kb: '0'
                    };
                }

                const mimeType = matches[1];
                const buffer = Buffer.from(matches[2], 'base64'); // Decode base64 data
                const fileSizeInKB = buffer.length / 1024;

                // Check if the MIME type is valid for DOC or PDF
                const validMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                const fileValid = validMimeTypes.includes(mimeType);

                return {
                    file_valid: fileValid,
                    file_mime_type: mimeType,
                    file_size_kb: fileSizeInKB.toFixed(2)
                };
            } catch (error) {
                return {
                    file_valid: false,
                    file_mime_type: '',
                    file_size_kb: '0'
                };
            }
        };

        // Separate numbers and alphabets
        const numbers = data.filter(item => isNumber(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

        // Find the highest alphabet (case insensitive)
        let highestLowercaseAlphabet = '';
        data.forEach((item: string) => {
            if (isNumber(item)) {
                numbers.push(item);
            } else if (/[a-zA-Z]/.test(item)) {
                alphabets.push(item);
                if (item === item.toLowerCase() && (!highestLowercaseAlphabet || item > highestLowercaseAlphabet)) {
                    highestLowercaseAlphabet = item;
                }
            }
        });

        let fileDetails = { file_valid: false, file_mime_type: '', file_size_kb: '0' };
        if (file_b64) {
            fileDetails = handleFile(file_b64);
        }

        // Format the result
        return res.status(200).json({
            is_success: true,
            user_id: "saketh_kokkonda_21022004",
            email: "kk8429@srmist.edu.in",
            roll_number: "RA2111047010067",
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
            ...fileDetails
        });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message, is_success: false });
    }
}

export async function GetRequest(req: Request, res: Response) {
    try {
        // Return hardcoded response
        return res.status(200).send({
            operation_code: 1
        });
    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({ message: (error as Error).message, is_success: false });
    }
}