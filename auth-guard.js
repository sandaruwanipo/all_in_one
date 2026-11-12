// UI-only entry guard. Firestore rules — not this script — enforce actual data protection.
import {firebaseConfig} from './firebase-config.js';
import {initializeApp,getApp,getApps} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {getAuth,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {getFirestore,doc,getDoc} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
function block(message){let box=document.querySelector('#nipo-guard-overlay');if(!box){box=document.createElement('div');box.id='nipo-guard-overlay';box.style.cssText='visibility:visible!important;position:fixed;inset:0;z-index:999999;background:#112d46;color:white;display:grid;place-items:center;padding:25px;font:15px Arial';document.body.appendChild(box)}box.innerHTML='';const content=document.createElement('div');content.style.cssText='background:#1d4260;border:1px solid #637c94;border-radius:14px;padding:28px;max-width:470px;text-align:center;box-shadow:0 12px 40px #0003';const head=document.createElement('h2');head.textContent='NIPO Officer Workspace';const p=document.createElement('p');p.textContent=message;const link=document.createElement('a');link.href='../index.html';link.textContent='Return to officer sign-in';link.style.cssText='display:inline-block;color:#ffe5a8;padding:12px';content.append(head,p,link);box.appendChild(content)}
if(firebaseConfig.apiKey.startsWith('REPLACE')){block('This website needs a Firebase project setup. See SETUP.md.')}else{
try{const app=getApps().length?getApp():initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);
onAuthStateChanged(auth,async u=>{if(!u||!u.emailVerified){block('Sign in with a verified NIPO officer account to continue.');return}try{const profile=await getDoc(doc(db,'officers',u.uid));if(!profile.data()?.approved){block('This officer account is awaiting administrator approval.');return}document.documentElement.classList.remove('nipo-secure-pending');document.querySelector('#nipo-guard-overlay')?.remove();window.__nipoOfficer={uid:u.uid,role:profile.data().role};
if(document.getElementById('loginOverlay')&&document.getElementById('mainAppContainer')){
  sessionStorage.setItem('nipo_auth_session','true');document.getElementById('loginOverlay').classList.add('hidden');document.getElementById('mainAppContainer').classList.remove('hidden');document.getElementById('mainAppContainer').classList.add('flex');
  if(typeof window.initApp==='function'&&!window.__nipoClassBooted){window.__nipoClassBooted=true;window.initApp()}
}
}catch(e){block('Unable to verify staff authorization: '+e.message)}},e=>block('Officer sign-in error: '+e.message));}catch(e){block('Workspace setup error: '+e.message)}}
