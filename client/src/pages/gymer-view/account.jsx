import React from "react";
import accountImage from "../../assets/account.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Orders from "@/components/gymer-view/order";
import Address from "@/components/gymer-view/address";
import GymOrders from "@/components/gymer-view/order";

const GymAccount = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          className="md:h-full h-auto w-full object-cover object-center"
          src={accountImage}
          alt="account page banner image"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <GymOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default GymAccount;
