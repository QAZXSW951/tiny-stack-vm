import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
import{join}from"node:path";
function R(p,q){let D=new Int32Array(256),s=0,C=new Int32Array(64),c=0,M=new Int32Array(256),o=new Uint8Array(65536),l=0,i=0,pc=0,t=0;
let d=e=>({out:o.slice(0,l),code:e});
for(;;){
if(t==1e6)return d(10);
if(pc<0||pc>=p.length)return d(9);
let a=p[pc],k=a<=7||a>=16&&a<=34||a>=48&&a<=52||a==64||a==65||a>=80&&a<=83;
if(!k)return d(5);
let m=a==1?1:a==2?4:a>=48&&a<=51?2:0;
if(pc+m>=p.length)return d(9);
t++;let n=pc+1+m;pc=n;
switch(a){
case 0:return d(0);
case 1:if(s>=256)return d(3);D[s++]=(p[n-1]<<24)>>24;break;
case 2:if(s>=256)return d(3);D[s++]=p[n-4]|p[n-3]<<8|p[n-2]<<16|p[n-1]<<24;break;
case 3:if(s<1)return d(2);s--;break;
case 4:if(s<1)return d(2);if(s>=256)return d(3);D[s]=D[s-1];s++;break;
case 5:if(s<2)return d(2);{let x=D[s-1];D[s-1]=D[s-2];D[s-2]=x;}break;
case 6:if(s<2)return d(2);if(s>=256)return d(3);D[s]=D[s-2];s++;break;
case 7:if(s<3)return d(2);{let x=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=x;}break;
case 23:if(s<1)return d(2);D[s-1]=-D[s-1]|0;break;
case 27:if(s<1)return d(2);D[s-1]=~D[s-1];break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
if(s<2)return d(2);let y=D[s-1],x=D[s-2],r=0;
if(a==16)r=x+y|0;else if(a==17)r=x-y|0;else if(a==18)r=Math.imul(x,y);
else if(a==19){if(!y)return d(4);r=x==-2147483648&&y==-1?x:x/y|0;}
else if(a==20){if(!y)return d(4);r=y==-1?0:x%y|0;}
else if(a==21){if(!y)return d(4);r=Math.floor((x>>>0)/(y>>>0))|0;}
else if(a==22){if(!y)return d(4);r=(x>>>0)%(y>>>0)|0;}
else if(a==24)r=x&y;else if(a==25)r=x|y;else if(a==26)r=x^y;
else if(a==28)r=x<<(y&31);else if(a==29)r=x>>(y&31);else if(a==30)r=x>>>(y&31)|0;
else if(a==32)r=x==y?1:0;else if(a==33)r=x<y?1:0;else r=(x>>>0)<(y>>>0)?1:0;
s-=2;D[s++]=r;break;}
case 48:case 49:case 50:{let v=((p[n-2]|p[n-1]<<8)<<16)>>16,t2=true;
if(a!=48){if(s<1)return d(2);let z=D[--s];t2=a==49?z==0:z!=0;}
if(t2)pc=n+v;break;}
case 51:if(c>=64)return d(7);C[c++]=n;pc=p[n-2]|p[n-1]<<8;break;
case 52:if(!c)return d(8);pc=C[--c];break;
case 64:if(s<1)return d(2);{let z=D[s-1];if(z<0||z>255)return d(6);D[s-1]=M[z];}break;
case 65:if(s<2)return d(2);{let z=D[s-1],v=D[s-2];if(z<0||z>255)return d(6);s-=2;M[z]=v;}break;
case 80:if(s<1)return d(2);{let z=String(D[s-1]);if(l+z.length>65536)return d(11);s--;for(let j=0;j<z.length;j++)o[l++]=z.charCodeAt(j);}break;
case 81:if(s<1)return d(2);if(l+1>65536)return d(11);o[l++]=D[--s]&255;break;
case 82:if(s>=256)return d(3);D[s++]=i<q.length?q[i++]:-1;break;
case 83:if(s<1)return d(2);return d(D[--s]&255);
default:return d(5);
}}}
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(let id of readdirSync(I).sort()){let r=R(new Uint8Array(readFileSync(join(I,id,"program.bin"))),new Uint8Array(readFileSync(join(I,id,"input.bin"))));
mkdirSync(join(O,id),{recursive:true});writeFileSync(join(O,id,"stdout.bin"),r.out);writeFileSync(join(O,id,"exit.txt"),r.code+"\n");}
