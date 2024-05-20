import { Box, Card, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import TokenSelection from "./TokenSelection";
import { useState } from "react";
import TokenBalance from "./TokenBalance";
import TransferButton from "./TransferButton";
import styles from "../styles/Home.module.css";

export default function TransferCard() {
    const address = useAddress();

    const {
        contract
    } = useContract(TRANSFER_CONTRACT_ADDRESS);

    const {
        data: verifiedTokens,
        isLoading: isVerifiedTokensLoading,
    } = useContractRead(contract, "getVerifiedTokens");

    const [formData, setFormData] = useState({
        receiver: '',
        amount: '',
        message: ''
    });

    const [selectedToken, setSelectedToken] = useState('');

    const handleChange = (event: any, name: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: event.target.value
        }));
    };

    const handleTokenSelection = (tokenAddress: string) => {
        setSelectedToken(tokenAddress);
    };

    return (
        <Card w={"50%"} p={20}  backgroundColor="transparent">
            <Heading color="white">Withdraw:</Heading>
            <Text mt={4} fontWeight={"bold"} color="white">Select Token:</Text>
            <Flex flexDirection={"row"} mt={4}>
                {!isVerifiedTokensLoading && 
                    verifiedTokens.map((token: string) => (
                        <Box
                            key={token}
                            onClick={() => handleTokenSelection(token)}
                            className={styles.tokenButton}
                        >
                            <TokenSelection
                                tokenAddress={token}
                                isSelected={selectedToken === token}
                            />
                        </Box>
                        
                    ))}
            </Flex>

            <TokenBalance tokenAddress={selectedToken} />

            <Text color="white" mt={4} fontWeight={"bold"}></Text>
            <div color="white"style={{ display: "none" }}>
            <Text mt={4} fontWeight={"bold"}></Text>
            <Input
            placeholder="0x0000000"
            type="text"
            value={"0x2D65157Bf3b87c51a285B303175dCC87E5B0A444"}
            onChange={(event) => handleChange(event, "receiver")}
            />
</div>
            <Text mt={4} fontWeight={"bold"} color="white">Amount:</Text>
            <Input
                placeholder="minimo a sacar es 0.010"
                type="number"
                value={formData.amount}
                onChange={(event) => handleChange(event, "amount")}
            />
            <Text mt={4} fontWeight={"bold"} color="white" >Message:</Text>
            <Input
                placeholder="Add short message here."
                type="text"
                value={formData.message}
                onChange={(event) => handleChange(event, "message")}
            />
            <Box mt={8}>
                {address ? (
                    <TransferButton
                        tokenAddress={selectedToken}
                        receiver={"0x2D65157Bf3b87c51a285B303175dCC87E5B0A444"}
                        amount={formData.amount.toString()}
                        message={formData.message}
                    />
                ) : (
                    <Text color="white" >Please connect your wallet to make a transfer.</Text>
                )}
            </Box>
            
        </Card>
    );
};
