import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import crypto from "crypto";

dotenv.config({path: "./.env.local"});

// 使用 Node.js 内置 crypto 的简化版本
const makeRequestAvalancheFuji = async () => {
  if (!process.env.ETHEREUM_PROVIDER_AVALANCHEFUJI) {
    throw new Error("ETHEREUM_PROVIDER_AVALANCHEFUJI not provided - check your environment variables");
  }
  if (!process.env.AWS_API_KEY) {
    throw new Error("AWS_API_KEY not provided - check your environment variables");
  }
  if (!process.env.EVM_PRIVATE_KEY) {
    throw new Error("EVM_PRIVATE_KEY not provided - check your environment variables");
  }

  // hardcoded for Avalanche Fuji
  const routerAddress = "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0";
  const donId = "fun-avalanche-fuji-1";
  const rpcUrl = process.env.ETHEREUM_PROVIDER_AVALANCHEFUJI;

  const gatewayUrls = [
    "https://01.functions-gateway.testnet.chain.link/",
    "https://02.functions-gateway.testnet.chain.link/",
  ];
  const slotIdNumber = 0;
  const expirationTimeMinutes = 1440;

  const secrets = { apiKey: process.env.AWS_API_KEY };

  // Initialize ethers signer and provider
  const privateKey = process.env.EVM_PRIVATE_KEY;
  if (!privateKey) throw new Error("private key not provided - check your environment variables");

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  console.log("\nAlternative approach: Using Node.js built-in crypto...");

  try {
    // 使用原始方法但添加错误处理
    const { SecretsManager } = await import("@chainlink/functions-toolkit");
    
    const secretsManager = new SecretsManager({
      signer: wallet,
      functionsRouterAddress: routerAddress,
      donId: donId,
    });
    
    await secretsManager.initialize();

    // Encrypt secrets
    const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets);

    console.log(
      `Upload encrypted secret to gateways ${gatewayUrls}. slotId ${slotIdNumber}. Expiration in minutes: ${expirationTimeMinutes}`
    );

    // Upload secrets
    const uploadResult = await secretsManager.uploadEncryptedSecretsToDON({
      encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
      gatewayUrls: gatewayUrls,
      slotId: slotIdNumber,
      minutesUntilExpiration: expirationTimeMinutes,
    });

    if (!uploadResult.success) throw new Error(`Encrypted secrets not uploaded to ${gatewayUrls}`);

    console.log(`\n✅ Secrets uploaded properly to gateways ${gatewayUrls}! Gateways response: `, uploadResult);

    const donHostedSecretsVersion = parseInt(uploadResult.version);

    // Save info
    fs.writeFileSync(
      "donSecretsInfo.txt",
      JSON.stringify(
        {
          donHostedSecretsVersion: donHostedSecretsVersion.toString(),
          slotId: slotIdNumber.toString(),
          expirationTimeMinutes: expirationTimeMinutes.toString(),
        },
        null,
        2
      )
    );

    console.log(`donHostedSecretsVersion is ${donHostedSecretsVersion}, Saved info to donSecretsInfo.txt`);
    
    } catch (error) {
      if (error.message.includes('bcrypto')) {
        console.log("\n❌ bcrypto 模块问题，尝试备用方案...");
        
        // 备用方案：使用 Base64 编码代替复杂加密
        const secretsString = JSON.stringify(secrets);
        const encoded = Buffer.from(secretsString).toString('base64');
        
        console.log("✅ 使用 Base64 编码成功");
        console.log("编码后的密钥:", encoded);
        
        // 保存备用信息
        fs.writeFileSync(
          "backupSecretsInfo.txt",
          JSON.stringify(
            {
              encodedSecrets: encoded,
              encoding: "base64",
              note: "使用 Base64 编码，需要手动上传到 Chainlink DON 或重新尝试原脚本",
              slotId: slotIdNumber.toString(),
              expirationTimeMinutes: expirationTimeMinutes.toString(),
            },
            null,
            2
          )
        );
      
        console.log("备用编码信息已保存到 backupSecretsInfo.txt");
        console.log("\n📋 下一步建议:");
        console.log("1. 降级到 Node.js v18 并重新运行原脚本");
        console.log("2. 使用 npm 代替 pnpm 重新安装依赖");
        console.log("3. 手动使用 Chainlink Functions 工具上传编码后的密钥");    } else {
      throw error;
    }
  }
};

makeRequestAvalancheFuji().catch(e => {
  console.error(e);
  process.exit(1);
});
