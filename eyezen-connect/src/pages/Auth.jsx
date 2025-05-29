import React, { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { Eye, EyeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function Auth() {
    const [activeTab, setActiveTab] = useState("login");
    const [role, setRole] = useState("patient");
    const navigate = useNavigate();
    const handleLogin = (e)=>{
        e.preventDefault();
        console.log(role);
        if(role==="Optometrist"){
            navigate("/optometricdashboard");
        }else{
            navigate("/doctor-dashboard");
        }
    }
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
                <div className="mb-8 text-center"
                
                >
                     <div className="bg-accent rounded-full h-24 w-24 mx-auto flex items-center justify-center mb-4">
            <EyeIcon className="h-12 w-12 text-green-400" />
          </div>

                    <h1 className="text-3xl font-bold">EyeZenx</h1>
                    <p className="text-muted-foreground mt-2">Your Smart Eye Health Care</p>
                </div>

                <div className="w-full max-w-sm">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Sign Up</TabsTrigger>
                        </TabsList>

                        {/* Login Form */}
                        <TabsContent value="login">
                            <Card className="mb-4 shadow-lg">
                                <CardContent className="pt-6">
                                    <div className="flex mb-6 border-b border-primary-light">
                                        {["Optometrist", "doctor"].map((type) => (
                                            <Button
                                                key={type}
                                                type="button"
                                                variant="ghost"
                                                className={`flex-1 py-2 px-4 rounded-none ${role === type
                                                        ? "text-green-400 border-b-2 border-green-400 font-medium"
                                                        : "text-muted-foreground hover:text-foreground"
                                                    }`}
                                                onClick={() => setRole(type)}
                                            >
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </Button>
                                        ))}
                                    </div>

                                    <form className="space-y-4">
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Mobile / Email</label>
                                            <Input placeholder="Enter mobile or email" />
                                        </div>

                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Password</label>
                                            <Input type="password" placeholder="Enter password" />
                                        </div>

                                        <Button type="submit" onClick = {handleLogin} className="w-full bg-green-400 hover:bg-green-500 text-[#1A1512] font-medium">
                                            Login
                                        </Button>
                                    </form>

                                    <div className="mt-4 text-center">
                                        <a href="#" className="text-green-400 text-sm">Forgot Password?</a>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="text-center">
                                <p className="text-[#716A63]">
                                    Don't have an account?{" "}
                                    <Button variant="link" className="text-green-400 p-0" onClick={() => setActiveTab("register")}>
                                        Sign Up
                                    </Button>
                                </p>
                            </div>
                        </TabsContent>

                        {/* Register Form */}
                        <TabsContent value="register">
                            <Card className="mb-4 shadow-lg">
                                <CardContent className="pt-6">
                                    <div className="flex mb-6 border-b text-[#269CA3]
">
                                        {["Optometrist", "doctor"].map((type) => (
                                            <Button
                                                key={type}
                                                type="button"
                                                variant="ghost"
                                                className={`flex-1 py-2 px-4 rounded-none ${role === type
                                                        ? "text-green-400 border-b-2 border-green-400 font-medium"
                                                        : "text-[#716A63] hover:text-foreground"
                                                    }`}
                                                onClick={() => setRole(type)}
                                            >
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </Button>
                                        ))}
                                    </div>

                                    <form className="space-y-4">
                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Full Name</label>
                                            <Input placeholder="Enter your full name" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-1 text-sm font-medium">Email</label>
                                                <Input placeholder="Enter email" />
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-medium">Mobile</label>
                                                <Input placeholder="Mobile number" />
                                            </div>

                                        </div>

                                        <Separator />


                                        <div>
                                            <label className="block mb-1 text-sm font-medium">Password</label>
                                            <Input type="password" placeholder="Choose a password" />
                                        </div>

                                        <div>
                                            <label className='block mb-1 text-sm font-medium'>Optical Shop Registration Number</label>
                                            <Input placeholder="Enter your Optical shop Registration Number" />
                                        </div>
                                        <div>
                                            <label className='block mb-1 text-sm font-medium'>Address</label>
                                            <Input placeholder="Enter your address" />
                                        </div>

                                      
                                        {role=== "doctor" && (
                                            <div>
                                                <label className='block mb-1 text-sm font-medium'>License Number</label>
                                                <Input placeholder="Enter your license number" />
                                            </div>
                                        )}

                                        {role === "doctor" && (
                                            <div>
                                                <label className='block mb-1 text-sm font-medium'>Specialization</label>
                                                <Input placeholder="Enter your specialization" />
                                            </div>
                                        )}


                                        {role==="doctor" && (
                                            <div>
                                                <label className='block mb-1 text-sm font-medium'>Experience</label>
                                                <Input placeholder="Enter your experience" />
                                            </div>
                                        )}
                                        <input type="hidden" name="role" value={role} />

                                        <Button type="submit" className="w-full bg-green-400 hover:bg-green-500 text-[#1A1512]
 font-medium">
                                            Sign Up
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            <div className="text-center">
                                <p className="text-muted-foreground">
                                    Already have an account?{" "}
                                    <Button variant="link" className="text-green-400 p-0" onClick={() => setActiveTab("login")}>
                                        Login
                                    </Button>
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Auth;