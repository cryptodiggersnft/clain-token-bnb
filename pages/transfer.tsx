import { Container, Flex } from "@chakra-ui/react";
import TransferCard from "../components/TransferCard";
import Events from "../components/Events";

export default function TransferPage() {
    return (
        <Container maxW={"1440px"} 
        backgroundImage={`url('/images/Slider_principal2.jpg')`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat">
            <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <TransferCard />
                <Events />
            </Flex>
        </Container>
    );
}
