import SessionExpiredModal from "@/components/shared/auth/SessionExpiredModal/SessionExpiredModal";
import ReduxInitializer from "@/redux/apiClient/ReduxInitializer";
import GlobalSocketConnector from "@/socket/connectors/GlobalSocketConnector";
import { cookies } from "next/headers";
import { SocketProvider } from "./SocketProvider";
import StoreProvider from "./StoreProvider";

const Providers = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user")?.value;

    let user = null;
    if (userCookie) {
        try {
            user = JSON.parse(userCookie);
        } catch (error) {
            console.error("Error parsing user cookie:", error);
        }
    }
    return (
        <StoreProvider>
            <ReduxInitializer user={user} />
            <SocketProvider>
                <GlobalSocketConnector />
                {children}
            </SocketProvider>
            <SessionExpiredModal />
        </StoreProvider>
    );
}

export default Providers;