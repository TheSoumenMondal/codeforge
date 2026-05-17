"use client";

import { CheckCircleIcon } from "@phosphor-icons/react";
import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type TProps = {
  children: React.ReactNode;
};

const layout = ({ children }: TProps) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center overflow-y-auto py-4 md:py-0">
      <div className="w-full max-w-4xl h-150 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0">
        <div className="h-full hidden lg:flex p-8 flex-col gap-10">
          <div className=" w-full mt-4">
            <Button
              variant="decorations"
              animation="none"
              size="lg"
              className="text-orange-500"
            >
              Accelerate your coding skills
            </Button>
          </div>

          <div>
            <p className="font-serif text-lg">
              Solve problems, learn new concepts, and get feedback on your code.
              Join a community of developers and take your coding skills to the
              next level with our interactive platform.
            </p>
          </div>

          <div>
            <ul>
              <li className="flex items-center gap-2">
                <CheckCircleIcon
                  weight="duotone"
                  size={20}
                  className="text-orange-500"
                />
                <span>Interactive coding challenges</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon
                  weight="duotone"
                  size={20}
                  className="text-orange-500"
                />
                <span>Real-time feedback on your code</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon
                  weight="duotone"
                  size={20}
                  className="text-orange-500"
                />
                <span>Community support and collaboration</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center">
            <Avatar className="relative z-40 -mr-3 border-2 border-background">
              <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" />
              <AvatarFallback className="bg-pink-400 text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <Avatar className="relative z-30 -mr-3 border-2 border-background">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" />
              <AvatarFallback className="bg-blue-400 text-white">
                SM
              </AvatarFallback>
            </Avatar>
            <Avatar className="relative z-20 -mr-3 border-2 border-background">
              <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" />
              <AvatarFallback className="bg-green-400 text-black">
                JS
              </AvatarFallback>
            </Avatar>
            <Avatar className="relative z-10 border-2 border-background">
              <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" />
              <AvatarFallback className="bg-teal-400 text-white">
                RS
              </AvatarFallback>
            </Avatar>{" "}
            <p className="font-semibold text-xs">+20.3k developers</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground border-orange-400 border-l-2 pl-4 py-2">
              Join thousands of developers who have already accelerated their
              coding skills with our platform. Sign up now and start solving
              problems today!
            </p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center p-4 md:p-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
